alter table public.allowed_users
  add column if not exists active boolean not null default true;

alter table public.domains enable row level security;
alter table public.allowed_users enable row level security;

create unique index if not exists domains_normalized_domain_uidx
  on public.domains (
    lower(regexp_replace(regexp_replace(btrim(domain), '^https?://', '', 'i'), '/+$', ''))
  );

revoke all on table public.domains from public, anon, authenticated;
revoke all on table public.domains from service_role;
grant select, insert, update, delete on table public.domains to service_role;
do $$
declare
  domains_id_sequence text;
begin
  domains_id_sequence := pg_get_serial_sequence('public.domains', 'id');
  if domains_id_sequence is not null then
    execute format('grant usage, select on sequence %s to service_role', domains_id_sequence);
  end if;
end;
$$;
revoke all on table public.allowed_users from public, anon, authenticated;
grant select on table public.allowed_users to service_role;

drop policy if exists "authenticated users can insert domains" on public.domains;
drop policy if exists "authenticated users can update domains" on public.domains;
drop policy if exists "anon can read domains" on public.domains;
drop policy if exists "anonymous can read domains" on public.domains;

create table if not exists public.brand_access_attempts (
  bucket_key text primary key,
  window_started_at timestamptz not null default now(),
  attempt_count integer not null default 0
);

alter table public.brand_access_attempts enable row level security;
revoke all on table public.brand_access_attempts from public, anon, authenticated;
grant all on table public.brand_access_attempts to service_role;

create or replace function public.consume_brand_access_attempt(p_bucket_key text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_window timestamptz;
  current_attempts integer;
begin
  delete from public.brand_access_attempts
  where window_started_at < now() - interval '1 day';

  insert into public.brand_access_attempts (bucket_key, window_started_at, attempt_count)
  values (p_bucket_key, now(), 1)
  on conflict (bucket_key) do update
  set window_started_at = case
        when public.brand_access_attempts.window_started_at < now() - interval '15 minutes' then now()
        else public.brand_access_attempts.window_started_at
      end,
      attempt_count = case
        when public.brand_access_attempts.window_started_at < now() - interval '15 minutes' then 1
        else public.brand_access_attempts.attempt_count + 1
      end
  returning window_started_at, attempt_count into current_window, current_attempts;

  return current_attempts <= 5;
end;
$$;

revoke all on function public.consume_brand_access_attempt(text) from public, anon, authenticated;
grant execute on function public.consume_brand_access_attempt(text) to service_role;

create or replace function public.import_domains(p_rows jsonb)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  import_row jsonb;
  normalized_domain text;
  incoming_brand text;
  incoming_manager text;
  incoming_source text;
  matched_id public.domains.id%type;
  affected_count integer;
  added_count integer := 0;
  updated_count integer := 0;
  unchanged_count integer := 0;
begin
  if jsonb_typeof(p_rows) <> 'array' then
    raise exception 'Import rows must be an array.';
  end if;

  if jsonb_array_length(p_rows) > 10000 then
    raise exception 'Import exceeds the 10,000 row limit.';
  end if;

  perform pg_advisory_xact_lock(hashtextextended('directory-domains-import', 0));

  for import_row in select value from jsonb_array_elements(p_rows)
  loop
    normalized_domain := lower(regexp_replace(btrim(coalesce(import_row->>'domain', '')), '^https?://', '', 'i'));
    normalized_domain := regexp_replace(normalized_domain, '/+$', '');
    incoming_brand := nullif(btrim(import_row->>'brand'), '');
    incoming_manager := nullif(btrim(import_row->>'manager'), '');
    incoming_source := nullif(btrim(import_row->>'source'), '');

    if normalized_domain = '' or length(normalized_domain) > 253 or normalized_domain ~ '[[:space:]/?#]' or normalized_domain !~ '\.' then
      raise exception 'Import contains an invalid domain.';
    end if;

    select id into matched_id
    from public.domains
    where lower(regexp_replace(regexp_replace(btrim(domain), '^https?://', '', 'i'), '/+$', '')) = normalized_domain
    for update;

    if matched_id is null then
      insert into public.domains (domain, brand, manager, source)
      values (normalized_domain, incoming_brand, incoming_manager, incoming_source);
      added_count := added_count + 1;
    else
      update public.domains
      set domain = normalized_domain,
          brand = incoming_brand,
          manager = incoming_manager,
          source = incoming_source,
          updated_at = now()
      where id = matched_id
        and (domain is distinct from normalized_domain
          or brand is distinct from incoming_brand
          or manager is distinct from incoming_manager
          or source is distinct from incoming_source);
      get diagnostics affected_count = row_count;
      if affected_count > 0 then
        updated_count := updated_count + 1;
      else
        unchanged_count := unchanged_count + 1;
      end if;
    end if;
  end loop;

  return jsonb_build_object('added', added_count, 'updated', updated_count, 'unchanged', unchanged_count);
end;
$$;

revoke all on function public.import_domains(jsonb) from public, anon, authenticated;
grant execute on function public.import_domains(jsonb) to service_role;