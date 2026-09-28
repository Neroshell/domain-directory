# Directory access setup

## Required server environment variables

- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service-role secret, server runtime only.
- `BRAND_ACCESS_PASSWORD_HASH`: colon-delimited scrypt hash output by `node scripts/generate-brand-password-hash.mjs`.
- `BRAND_SESSION_SECRET`: at least 32 random bytes, for example generated with `openssl rand -base64 48`.

Keep all three out of `NEXT_PUBLIC_*`. Configure them in local `.env.local` and the hosting provider's server-side environment settings. Restart/redeploy after changing them.

Replacing only `BRAND_ACCESS_PASSWORD_HASH` changes the password for future logins; already-issued Brand sessions remain valid until their 12-hour expiry. To revoke active sessions immediately while rotating the password, also replace `BRAND_SESSION_SECRET`.

## Database migration

Apply `supabase/migrations/20260928000000_secure_directory_access.sql` to the intended Supabase project before deploying. It:

- adds `allowed_users.active` with a default of `true`;
- enables RLS and revokes direct `domains` access from `public`, `anon`, and `authenticated`;
- restricts `allowed_users` reads to the server service role;
- adds a service-role-only Brand password rate-limit RPC;
- adds an atomic service-role-only domain import RPC.

The Next.js server verifies Supabase users against active allowlist records before using its service-role client. The service-role key is never imported into client components. Brand Access is read-only at the API layer.

The migration does not delete or truncate domain records and relies on the existing unique constraint on `domains.domain` for conflict-safe imports. Verify the live constraint and grants in Supabase after applying it.

The additional normalized unique index will intentionally fail to apply if existing rows already collide after lowercasing and removing accidental HTTP(S) prefixes/trailing slashes. If that happens, inspect and reconcile those records manually before retrying; the migration does not choose or delete a duplicate automatically.