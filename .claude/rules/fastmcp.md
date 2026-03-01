# FastMCP Naming Standards (Node.js / TypeScript)

## Server

- Server instance variable: **camelCase** matching the domain — `automationServer`, `documentServer`
- Server name string (passed to `new FastMCP()`): human-readable Title Case — `"Business Automation"`, `"Document Processing"`
- Server file: `server.ts` or `<domain>-server.ts` at the project root or in `/lib/mcp/`

```ts
import { FastMCP } from 'fastmcp';
export const automationServer = new FastMCP('Business Automation');
```

## Tools

- Tool function names: **camelCase**, verb-first describing the action — `searchDocuments`, `summariseText`, `sendNotification`, `lookupCustomer`
- Tool names registered with MCP protocol: camelCase matching the function name — `searchDocuments`, `lookupCustomer`
- Tool descriptions: plain English sentence; include what it returns
- Parameter names: camelCase — `documentId`, `queryText`, `maxResults`

```ts
// Correct
automationServer.addTool({
  name: 'searchDocuments',
  description: 'Search documents by query string. Returns a list of matching document excerpts with metadata.',
  parameters: z.object({
    query: z.string().describe('The search query'),
    limit: z.number().int().default(5).describe('Maximum results to return'),
  }),
  execute: async ({ query, limit }) => { ... },
});
```

## Resources

- Resource URI scheme: `<domain>://<path>` — `document://items/{documentId}`, `automation://runs/{runId}`
- Resource name string: kebab-case — `"document-detail"`, `"automation-run-status"`
- Resource handler function names: camelCase, noun-first — `documentDetail`, `automationRunStatus`
- URI template parameters: camelCase — `{documentId}`, `{runId}`

```ts
automationServer.addResource({
  uri: 'document://items/{documentId}',
  name: 'document-detail',
  load: async ({ documentId }) => { ... },
});
```

## Prompts

- Prompt handler function names: camelCase, use-case descriptive — `documentSearchPrompt`, `summaryRequestPrompt`
- Prompt name string: kebab-case — `"document-search"`, `"summary-request"`

```ts
automationServer.addPrompt({
  name: 'document-search',
  load: async ({ topic }) => `Search for documents about: ${topic}`,
});
```

## Zod Schemas (Tool Parameters)

- Follow TypeScript conventions: PascalCase with `Schema` suffix — `SearchDocumentsSchema`, `LookupCustomerSchema`
- Defined in `/types/tools.ts` or co-located in `/lib/mcp/tools/` — never inline in `addTool` calls

## Module and File Layout

```
/lib/mcp/
  server.ts                  # FastMCP server instantiation and startup
  tools/
    search-documents.ts      # searchDocuments tool
    send-notification.ts     # sendNotification tool
  resources/
    document-detail.ts       # document://items/{documentId}
```

## Environment Variables

- SCREAMING_SNAKE_CASE: `MCP_SERVER_PORT`, `MCP_SERVER_HOST`
- Shared with the main application: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `OPENAI_API_KEY`
