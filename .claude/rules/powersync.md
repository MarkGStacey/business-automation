# PowerSync Naming Standards

## Schema Definition

- Schema variable: **PascalCase** — `AppSchema`, `TrailSchema`, `BudgetSchema`
- Table definitions within the schema match the Supabase table name exactly (snake_case, plural): `trails`, `trail_segments`, `budget_transactions`
- Column names in the schema match Supabase column names exactly (snake_case)

```typescript
// Correct
export const AppSchema = new Schema({
  trails: new Table({ name: column.text, geometry: column.text }),
  budget_transactions: new Table({ amount: column.real, account_id: column.text }),
});
```

## Bucket Definitions (Sync Rules)

- Bucket parameter names: **snake_case** — `user_id`, `account_id`
- Bucket definition names in YAML: **snake_case**, descriptive of the data scope
  - `user_data` — data scoped to the authenticated user
  - `public_trails` — publicly accessible trail data
  - `account_transactions` — transactions for a specific account
- Bucket descriptors (dynamic): `by_user[user_id]`, `by_account[account_id]`

```yaml
# Correct bucket naming
bucket_definitions:
  user_data:
    parameters: SELECT request.user_id() as user_id
    data:
      - SELECT * FROM user_profiles WHERE user_id = bucket.user_id
  public_trails:
    data:
      - SELECT * FROM trails WHERE is_public = true
```

## TypeScript Integration

- Database type export: match the schema variable name with `Database` suffix — `AppDatabase`
- Hook/composable for PowerSync instance: `usePowerSync()` (follow the SDK convention)
- Custom query hooks: `useXxxQuery` — `useTrailsQuery`, `useTransactionsQuery`

## Attachment Tables (PowerSync Attachments)

- Table name: `<entity>_attachments` in snake_case — `trail_attachments`, `receipt_attachments`
- Attachment queue table: keep the PowerSync default `attachments_queue` unless there is a specific reason to rename

## Environment Variables

- SCREAMING_SNAKE_CASE: `POWERSYNC_URL`
- In Vite/Quasar apps prefix with `VITE_`: `VITE_POWERSYNC_URL`
