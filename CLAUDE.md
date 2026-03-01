# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

This is a Node.js business automation service deployed as serverless functions on Vercel. It uses the Vercel AI SDK to run Claude as an AI agent that can be triggered on a schedule or via webhooks, and integrates with external services to automate business workflows.

**Stack:** Node.js, TypeScript, Vercel Serverless Functions, Vercel AI SDK, Airtable, Slack, Microsoft Office 365 (Graph API)

## Project Goals

1. **AI agent execution** — Run Claude via the Vercel AI SDK from serverless functions, with tool use to take real actions (read/write data, send messages, send emails)
2. **Scheduled automation** — Trigger workflows on a cron schedule using Vercel cron jobs (defined in `vercel.json`)
3. **Webhook-driven automation** — Respond to inbound webhooks (e.g. form submissions, Slack events, external system triggers) to run AI-powered workflows on demand
4. **Airtable as data store** — Read from and write to Airtable bases as the primary data layer; Airtable tables act as both the input queue and the record of completed work
5. **Slack messaging** — Send notifications and structured messages to Slack channels as an output of automation workflows
6. **Office 365 email** — Read inbound emails from a business mailbox and send outbound emails via Microsoft Graph API using an Office 365 service account

## Project Structure

```
/api/
  webhooks/             Inbound webhook handlers (Slack events, external triggers)
  cron/                 Scheduled job handlers (triggered by vercel.json cron config)
/lib/
  ai.ts                 AI model provider configuration (Vercel AI SDK)
  tools/                AI tool definitions — one file per tool, imported into handlers
  clients/
    airtable.ts         Airtable client singleton
    slack.ts            Slack Web API client singleton
    graph.ts            Microsoft Graph (Office 365) client singleton
  prompts/              System prompt strings for each workflow
/types/                 Shared TypeScript types and Zod schemas
/middleware.ts          Vercel edge middleware (auth, logging)
vercel.json             Vercel routing and cron job configuration
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
| `.claude/rules/airtable.md` | Airtable client, base/table/field naming, CRUD patterns |
| `.claude/rules/slack.md` | Slack Web API client, message formatting, channel conventions |
| `.claude/rules/office365.md` | Microsoft Graph API, MSAL auth, email read/send patterns |
| `.claude/rules/fastmcp.md` | MCP server tools, resources, prompts (Node.js/TypeScript) |

## Git Conventions

All commits follow Conventional Commits (`<type>(<scope>): <description>`). See `.claude/rules/git.md` for the full specification.

## Key Principles

- Every `/api/` handler is a pure function — no global mutable state
- AI tool definitions live in `/lib/tools/` and are imported into handlers — never defined inline
- External service clients (Airtable, Slack, Graph) are singletons in `/lib/clients/` — never instantiated inline
- All secrets and IDs are environment variables; never hardcoded (including Airtable base IDs, Slack channel IDs, tenant IDs)
- Cron jobs and webhook handlers share the same tool definitions — the trigger mechanism does not affect the AI logic
- Edge runtime for lightweight webhook validation; Node.js runtime for anything calling external APIs or needing Node built-ins
