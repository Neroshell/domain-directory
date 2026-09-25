alter table public.domains enable row level security;

drop policy if exists "authenticated users can insert domains" on public.domains;
create policy "authenticated users can insert domains"
on public.domains
for insert
to authenticated
with check (true);

drop policy if exists "authenticated users can update domains" on public.domains;
create policy "authenticated users can update domains"
on public.domains
for update
to authenticated
using (true)
with check (true);