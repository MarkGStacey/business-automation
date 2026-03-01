# Vercel AI SDK Naming and Usage Standards

## Model Provider Configuration (`/lib/ai.ts`)

- Instantiate provider clients once in `/lib/ai.ts` and import throughout the codebase — never create them inline in handlers
- Variable names: descriptive, lowercase — `openai`, `anthropic`, `defaultModel`

```ts
// lib/ai.ts
import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';

export const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });
export const anthropic = createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export const defaultModel = openai('gpt-4o');
export const fastModel = openai('gpt-4o-mini');
```

## Core Functions

| Function | Use case |
|----------|---------|
| `streamText()` | Streaming text to the client (chat, completion) |
| `generateText()` | Non-streaming text generation (background jobs, cron) |
| `streamObject()` | Streaming structured data with a Zod schema |
| `generateObject()` | Non-streaming structured data (background jobs) |

- Default to `streamText` / `streamObject` for handler endpoints — streaming gives better UX
- Use `generateText` / `generateObject` only in background jobs or when the full result is needed before responding

## Streaming Responses

- Use `.toDataStreamResponse()` to return an AI SDK-compatible streaming response from a handler
- Pass `getErrorMessage` to surface errors to the client in development

```ts
// api/chat.ts
import { streamText } from 'ai';
import { defaultModel } from '@/lib/ai';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({ model: defaultModel, messages });
  return result.toDataStreamResponse();
}
```

## Tool Definitions

- Tool functions: **camelCase**, verb-first describing the action — `searchDocuments`, `sendEmail`, `lookupCustomer`
- One tool per file in `/lib/tools/`: `lib/tools/search-documents.ts`, `lib/tools/send-email.ts`
- Tool file names: **kebab-case** matching the tool name — `search-documents.ts`, `send-email.ts`
- Always define parameters with Zod and include a clear `description` on every field

```ts
// lib/tools/search-documents.ts
import { tool } from 'ai';
import { z } from 'zod';

export const searchDocuments = tool({
  description: 'Search the document store for content matching a query. Returns a list of matching document excerpts.',
  parameters: z.object({
    query: z.string().describe('The search query'),
    limit: z.number().int().min(1).max(20).default(5).describe('Maximum number of results to return'),
  }),
  execute: async ({ query, limit }) => {
    // ...
  },
});
```

- Import and pass tools as an object to `streamText` — the key becomes the tool name in the protocol

```ts
import { searchDocuments } from '@/lib/tools/search-documents';
import { sendEmail } from '@/lib/tools/send-email';

const result = streamText({
  model: defaultModel,
  tools: { searchDocuments, sendEmail },
  messages,
});
```

## Structured Output (`generateObject` / `streamObject`)

- Define output schemas with Zod in `/types/` and import them — never define inline in handlers
- Schema variable names: PascalCase with `Schema` suffix — `DocumentSummarySchema`, `TaskListSchema`

```ts
// types/schemas.ts
import { z } from 'zod';

export const DocumentSummarySchema = z.object({
  title: z.string(),
  summary: z.string(),
  keyPoints: z.array(z.string()),
  sentiment: z.enum(['positive', 'neutral', 'negative']),
});
```

```ts
// api/summarise-document.ts
import { generateObject } from 'ai';
import { DocumentSummarySchema } from '@/types/schemas';

const { object } = await generateObject({
  model: defaultModel,
  schema: DocumentSummarySchema,
  prompt: `Summarise this document: ${content}`,
});
```

## System Prompts

- Store system prompts as exported `const` strings in `/lib/prompts/`
- File names: kebab-case — `lib/prompts/document-summary.ts`, `lib/prompts/task-extraction.ts`
- Variable name: camelCase with `Prompt` suffix — `documentSummaryPrompt`, `taskExtractionPrompt`

```ts
// lib/prompts/document-summary.ts
export const documentSummaryPrompt = `You are a document analysis assistant...`;
```

## Error Handling

- Wrap AI calls in try/catch; return structured error responses — never let AI SDK errors propagate unhandled to the client
- Log the original error server-side; return a sanitised message to the client

## Environment Variables

- `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GOOGLE_GENERATIVE_AI_API_KEY` — SCREAMING_SNAKE_CASE
- Never log API keys, even partially
