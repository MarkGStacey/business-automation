# Vercel Naming and Structure Standards

## Function Files (`/api/`)

- Filenames: **kebab-case** — `chat.ts`, `process-webhook.ts`, `summarise-document.ts`
- One handler per file; the filename becomes the route path (`/api/chat`, `/api/process-webhook`)
- Dynamic segments: `[id].ts`, `[...path].ts`
- Group related handlers in subdirectories: `api/documents/[id].ts` → `/api/documents/:id`

## Handler Functions

- Named export `GET`, `POST`, `PUT`, `DELETE`, `PATCH` for each HTTP method
- Default export only when the handler supports all methods via a switch — prefer named exports

```ts
// Correct — named exports per method
export async function POST(req: Request): Promise<Response> { ... }
export async function GET(req: Request): Promise<Response> { ... }

// Avoid — method switching in a default export
export default function handler(req, res) {
  if (req.method === 'POST') { ... }
}
```

## Runtime Selection

- Declare runtime at the top of each file, never in `vercel.json` per-function config
- Edge runtime for: AI streaming responses, auth middleware, rate limiting, simple transformations
- Node.js runtime for: Supabase admin calls, file processing, anything needing Node built-ins

```ts
export const runtime = 'edge';   // Edge runtime
export const runtime = 'nodejs'; // Node.js runtime (default — can be omitted)
```

## Middleware (`middleware.ts`)

- Single `middleware.ts` at the project root — not inside `/api/`
- Use the `config` export to limit which paths the middleware runs on

```ts
export const config = {
  matcher: ['/api/:path*'],
};
```

- Middleware responsibilities: auth token validation, rate limiting, request logging
- Do not do heavy computation or database writes in middleware

## `vercel.json`

- Use for: project-wide headers, rewrites, redirects, cron job definitions
- Do not use for: per-function runtime (declare in the file), environment variables (use Vercel dashboard or `.env`)
- Cron job naming: descriptive kebab-case — `"path": "/api/sync-transactions"`

```json
{
  "crons": [
    { "path": "/api/sync-transactions", "schedule": "0 * * * *" }
  ]
}
```

## Environment Variables

- SCREAMING_SNAKE_CASE for all env vars: `SUPABASE_URL`, `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`
- Local development: `.env.local` (gitignored); never `.env` — Vercel reads `.env.local` automatically
- Provide `.env.example` with all keys listed but no values
- Prefix client-exposed vars with `NEXT_PUBLIC_` if using Next.js; otherwise all vars are server-side only

## Error Responses

- Always return a `Response` object with an appropriate status code and a JSON body
- Standard error shape: `{ error: string, code?: string }`

```ts
return new Response(JSON.stringify({ error: 'Not found' }), {
  status: 404,
  headers: { 'Content-Type': 'application/json' },
});
```

## File and Module Layout

```
/api/
  chat.ts                  # POST /api/chat — AI streaming
  summarise-document.ts    # POST /api/summarise-document
  webhooks/
    stripe.ts              # POST /api/webhooks/stripe
/lib/
  ai.ts                    # model provider instances
  db.ts                    # Supabase client singleton
  tools/
    search-documents.ts    # AI tool: searchDocuments
    send-email.ts          # AI tool: sendEmail
/types/
  api.ts                   # Request/response types
  tools.ts                 # Tool parameter/result types
middleware.ts
vercel.json
```
