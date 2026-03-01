# TypeScript Naming Standards

## Files and Modules

- All filenames: **kebab-case** — `document-service.ts`, `rate-limiter.ts`, `format-date.ts`
- One primary export per file where possible — keeps imports predictable
- Barrel files (`index.ts`) only for public-facing library boundaries, not for internal module grouping

## Types and Interfaces

- **PascalCase** for all types, interfaces, enums, and classes — `DocumentSummary`, `WebhookPayload`, `ProcessingStatus`
- Prefer `type` over `interface` unless declaration merging is needed
- No `I` prefix for interfaces — use plain PascalCase (`User`, not `IUser`)
- No `T` prefix for generics unless the name would conflict — `Result<T>`, `ApiResponse<Data>`

```ts
// Correct
type DocumentSummary = { title: string; summary: string };
type ApiResponse<T> = { data: T; error: null } | { data: null; error: string };

// Avoid
interface IDocumentSummary { ... }
```

## Zod Schemas

- Schema variables: PascalCase with `Schema` suffix — `DocumentSummarySchema`, `WebhookPayloadSchema`
- Derive TypeScript types from schemas with `z.infer<>` — do not duplicate type definitions

```ts
import { z } from 'zod';

export const WebhookPayloadSchema = z.object({
  event: z.string(),
  data: z.record(z.unknown()),
  timestamp: z.number(),
});

export type WebhookPayload = z.infer<typeof WebhookPayloadSchema>;
```

## Functions

- camelCase, verb-first for functions — `formatDate()`, `parseWebhookPayload()`, `buildPrompt()`
- Async functions return `Promise<T>` explicitly in type signatures when the return type is not obvious
- Avoid overloading — use union parameter types or options objects instead

## Constants

- SCREAMING_SNAKE_CASE for true constants (values that never change) — `MAX_RETRIES`, `DEFAULT_TIMEOUT_MS`
- camelCase for computed values and module-level config objects — `defaultHeaders`, `rateLimitConfig`

## Enums

- Prefer string literal unions over `enum` — easier to serialise, no runtime overhead

```ts
// Preferred
type ProcessingStatus = 'pending' | 'processing' | 'complete' | 'failed';

// Avoid
enum ProcessingStatus { Pending, Processing, Complete, Failed }
```

## Imports

- Use path aliases (`@/lib/...`, `@/types/...`) over relative paths deeper than one level
- Group imports: external packages first, then internal modules, then types
- Import types with `import type` when the import is only used for type checking

```ts
import { z } from 'zod';
import { streamText } from 'ai';

import { defaultModel } from '@/lib/ai';
import { supabase } from '@/lib/db';

import type { DocumentSummary } from '@/types/api';
```

## Error Handling

- Create typed error classes for domain errors — `class WebhookValidationError extends Error {}`
- Use `unknown` for caught errors and narrow with `instanceof` before accessing properties
- Do not swallow errors silently — log or rethrow

```ts
try {
  await processWebhook(payload);
} catch (err) {
  if (err instanceof WebhookValidationError) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
  throw err; // rethrow unexpected errors
}
```

## Utility Modules (`/lib/`)

- camelCase filenames — `lib/rate-limiter.ts`, `lib/format-date.ts`
- Export named functions — avoid default exports in utility files
- Helper functions: camelCase verb-first — `formatDate()`, `truncateText()`, `chunkArray()`
