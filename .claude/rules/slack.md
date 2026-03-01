# Slack Naming and Usage Standards

## Client (`/lib/clients/slack.ts`)

- Use the official `@slack/web-api` package — instantiate `WebClient` once as a singleton
- Never create a new `WebClient` inside a handler or tool

```ts
// lib/clients/slack.ts
import { WebClient } from '@slack/web-api';

export const slack = new WebClient(process.env.SLACK_BOT_TOKEN);
```

## Channel and User References

- Never hardcode channel IDs (`C01XXXXXXXX`) or user IDs (`U01XXXXXXXX`) — always use environment variables
- Environment variable naming: `SLACK_CHANNEL_<NAME>` for channels — `SLACK_CHANNEL_ALERTS`, `SLACK_CHANNEL_REPORTS`
- Resolve channel names to IDs at configuration time, not at call time — store IDs, not names

## Sending Messages

- All message-sending logic is wrapped in typed helper functions in `/lib/clients/slack.ts` or `/lib/`
- Function names: camelCase verb-first — `sendAlertMessage()`, `postWeeklySummary()`, `notifyOnError()`
- Prefer Block Kit for structured messages; use plain text only for simple notifications

```ts
// lib/clients/slack.ts
export async function sendAlertMessage(channel: string, text: string): Promise<void> {
  await slack.chat.postMessage({ channel, text });
}

export async function postBlockMessage(channel: string, blocks: KnownBlock[]): Promise<void> {
  await slack.chat.postMessage({ channel, blocks });
}
```

## Block Kit

- Define block arrays as typed `KnownBlock[]` (imported from `@slack/types`)
- Build blocks in dedicated functions — never inline large block arrays in handlers
- Block-builder function names: camelCase, noun-first describing the content — `buildSummaryBlocks()`, `buildTaskListBlocks()`

```ts
import type { KnownBlock } from '@slack/types';

export function buildSummaryBlocks(title: string, items: string[]): KnownBlock[] {
  return [
    { type: 'header', text: { type: 'plain_text', text: title } },
    { type: 'section', text: { type: 'mrkdwn', text: items.map(i => `• ${i}`).join('\n') } },
  ];
}
```

## Inbound Webhooks (`/api/webhooks/slack.ts`)

- Verify the Slack request signature before processing any event — use `@slack/bolt` or manual HMAC verification
- Respond with `200 OK` within 3 seconds; offload slow work to a background function or queue
- Signing secret: `SLACK_SIGNING_SECRET` environment variable

## AI Tool Integration

- Slack operations used by the AI agent are defined as tools in `/lib/tools/`
- Tool names: camelCase verb-first — `sendSlackMessage`, `postSlackSummary`
- Tools call the typed wrapper functions — never call `slack.chat.postMessage` directly inside a tool `execute` function

## Environment Variables

- `SLACK_BOT_TOKEN` — bot OAuth token (`xoxb-...`)
- `SLACK_SIGNING_SECRET` — for verifying inbound webhook requests
- `SLACK_CHANNEL_<NAME>` — one variable per channel the bot posts to
- Never log `SLACK_BOT_TOKEN`
