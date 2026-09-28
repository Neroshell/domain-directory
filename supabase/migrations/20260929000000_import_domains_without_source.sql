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

    if normalized_domain = '' or length(normalized_domain) > 253 or normalized_domain ~ '[[:space:]/?#]' or normalized_domain !~ '\.' then
      raise exception 'Import contains an invalid domain.';
    end if;

    select id into matched_id
    from public.domains
    where lower(regexp_replace(regexp_replace(btrim(domain), '^https?://', '', 'i'), '/+$', '')) = normalized_domain
    for update;

    if matched_id is null then
      insert into public.domains (domain, brand, manager)
      values (normalized_domain, incoming_brand, incoming_manager);
      added_count := added_count + 1;
    else
      update public.domains
      set domain = normalized_domain,
          brand = incoming_brand,
          manager = incoming_manager,
          updated_at = now()
      where id = matched_id
        and (domain is distinct from normalized_domain
          or brand is distinct from incoming_brand
          or manager is distinct from incoming_manager);
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