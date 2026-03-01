# Airtable Naming and Usage Standards

## Client (`/lib/clients/airtable.ts`)

- Instantiate the Airtable client once and export it — never create inline in handlers
- Base instances are also singletons, one per Airtable base used by the project

```ts
// lib/clients/airtable.ts
import Airtable from 'airtable';

Airtable.configure({ apiKey: process.env.AIRTABLE_API_KEY });

export const airtable = Airtable;
export const mainBase = airtable.base(process.env.AIRTABLE_BASE_ID!);
```

## Base and Table IDs

- Never hardcode base IDs (`appXXXXXXXXXXXXXX`) or table IDs (`tblXXXXXXXXXXXXXX`) — always use environment variables
- Environment variable naming: `AIRTABLE_BASE_ID`, `AIRTABLE_BASE_<NAME>_ID` for multiple bases

## Table Names

- Use the exact table name string as it appears in the Airtable UI — do not transform casing
- Store table name strings as exported constants in `/lib/clients/airtable.ts` to avoid typos

```ts
// lib/clients/airtable.ts
export const TABLES = {
  tasks: 'Tasks',
  contacts: 'Contacts',
  emailLog: 'Email Log',
} as const;
```

## Field Names

- Use the exact field name string as it appears in Airtable — do not transform casing
- When mapping Airtable records to TypeScript types, define the field names as a typed constant

```ts
// types/airtable.ts
export type TaskRecord = {
  id: string;
  fields: {
    Name: string;
    Status: 'Todo' | 'In Progress' | 'Done';
    'Assigned To': string;
    Notes: string;
  };
};
```

## CRUD Patterns

- Wrap Airtable calls in typed helper functions in `/lib/clients/airtable.ts` or domain-specific files in `/lib/`
- Function names: camelCase verb-first — `fetchPendingTasks()`, `markTaskComplete()`, `createEmailLogEntry()`
- Always handle the case where `fields` values may be `undefined` — Airtable omits empty fields from responses

```ts
// Correct — typed wrapper, handles missing fields
export async function fetchPendingTasks(): Promise<TaskRecord[]> {
  const records = await mainBase(TABLES.tasks)
    .select({ filterByFormula: `{Status} = 'Todo'` })
    .all();
  return records.map(r => ({ id: r.id, fields: r.fields as TaskRecord['fields'] }));
}
```

## AI Tool Integration

- Airtable operations used by the AI agent are defined as tools in `/lib/tools/`
- Tool names: camelCase verb-first — `readAirtableTask`, `updateAirtableRecord`, `createAirtableTask`
- Tools call the typed wrappers — never call the Airtable SDK directly inside a tool `execute` function

## Environment Variables

- `AIRTABLE_API_KEY` — personal access token or OAuth token
- `AIRTABLE_BASE_ID` — default base; add `AIRTABLE_BASE_<NAME>_ID` for additional bases
- Never log or expose `AIRTABLE_API_KEY`
