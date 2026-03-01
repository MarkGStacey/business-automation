# Supabase Naming Standards

## Tables

- **snake_case, plural**: `users`, `user_profiles`, `trail_segments`, `budget_transactions`
- Junction/pivot tables: `<entity1>_<entity2>` — `user_roles`, `trail_tags`, `account_categories`
- Use singular for lookup/enum tables where it reads more naturally: `country`, `currency` — but be consistent within a project

## Columns

- **snake_case** throughout: `first_name`, `trail_name`, `created_at`, `is_active`
- Primary key: `id` (UUID, not serial integer)
- Foreign keys: `<referenced_table_singular>_id` — `user_id`, `trail_id`, `account_id`
- Timestamps: `created_at`, `updated_at`, `deleted_at` — always `timestamptz`
- Soft-delete flag: `deleted_at` (nullable timestamp) preferred over `is_deleted` boolean
- Boolean columns: `is_` or `has_` prefix — `is_active`, `is_public`, `has_subscription`
- JSON/JSONB columns: singular noun describing the data — `metadata`, `settings`, `geometry`

## Indexes

- Pattern: `<table>_<column(s)>_idx` — `users_email_idx`, `trails_location_idx`
- Unique indexes: `<table>_<column(s)>_key` — `users_email_key`

## SQL Functions (PL/pgSQL)

- **snake_case**: `get_user_by_email()`, `update_trail_geometry()`, `calculate_monthly_spend()`
- Prefix with verb: `get_`, `create_`, `update_`, `delete_`, `calculate_`, `sync_`
- Trigger functions: `<table>_<event>_trigger()` — `users_updated_at_trigger()`

## RLS Policies

- Pattern: `<table>_<operation>_<condition>` in snake_case
- `users_select_own`, `trails_insert_authenticated`, `transactions_update_owner`
- Operations: `select`, `insert`, `update`, `delete`
- Conditions: `own`, `authenticated`, `public`, `admin`

## Edge Functions

- **kebab-case** directory names: `send-email/`, `process-payment/`, `sync-open-banking/`
- Entry point always `index.ts` within the function directory

## Storage Buckets

- **kebab-case**: `user-avatars`, `trail-images`, `receipt-uploads`
- Bucket names are lowercase and descriptive of the content type

## Database Roles / Users

- **snake_case**: `anon`, `authenticated`, `service_role` (Supabase defaults)
- Custom roles: `app_user`, `app_admin`

## Realtime Channels

- kebab-case descriptive name: `trail-updates`, `budget-changes`, `user-presence`

## Environment Variables

- SCREAMING_SNAKE_CASE: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- In Vite/Quasar apps prefix with `VITE_`: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- Never expose `SUPABASE_SERVICE_ROLE_KEY` to the client
