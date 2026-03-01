# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

This is a Node.js business automation service deployed as serverless functions on Vercel. It uses the Vercel AI SDK to power AI-driven automation workflows.

**Stack:** Node.js, TypeScript, Vercel Serverless Functions, Vercel AI SDK, Supabase

## Project Structure

```
/api/               Vercel serverless function handlers (one file = one route)
/lib/               Shared modules — clients, utilities, business logic
  /lib/ai.ts        AI model provider configuration
  /lib/db.ts        Supabase client
  /lib/tools/       AI tool definitions (one file per tool or domain)
/types/             Shared TypeScript types and Zod schemas
/middleware.ts      Vercel edge middleware (auth, rate limiting, logging)
vercel.json         Vercel project and routing configuration
```

## Rules Directory

All conventions live in `.claude/rules/`.

| File | Governs |
|------|---------|
| `.claude/rules/workflow.md` | Planning before execution, resuming interrupted tasks, todo list discipline |
| `.claude/rules/git.md` | Branch names, Conventional Commits format, PR/MR process, tags |
| `.claude/rules/typescript.md` | Types, interfaces, Zod schemas, module structure, naming |
| `.claude/rules/vercel.md` | Function handlers, runtime selection, middleware, environment variables, `vercel.json` |
| `.claude/rules/ai-sdk.md` | Vercel AI SDK — models, streaming, tool calling, structured output |
| `.claude/rules/supabase.md` | Tables, columns, FK patterns, RLS policy names, edge functions |
| `.claude/rules/fastmcp.md` | MCP server tools, resources, prompts (Node.js/TypeScript) |

## Git Conventions

All commits follow Conventional Commits (`<type>(<scope>): <description>`). See `.claude/rules/git.md` for the full specification.

## Key Principles

- Every `/api/` handler is a pure function — no global mutable state
- AI tool definitions live in `/lib/tools/` and are imported into handlers — never defined inline
- All secrets are environment variables; never hardcoded
- Prefer streaming responses (`streamText`, `streamObject`) for AI endpoints
- Edge runtime for latency-sensitive routes; Node.js runtime for anything requiring Node APIs
