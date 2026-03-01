# Office 365 / Microsoft Graph Naming and Usage Standards

## Client (`/lib/clients/graph.ts`)

- Use the official `@microsoft/microsoft-graph-client` package with MSAL for authentication
- Use `@azure/msal-node` (`ConfidentialClientApplication`) for the client credentials flow (service account / daemon app — no user interaction)
- Instantiate auth and Graph clients once as singletons — never inline in handlers

```ts
// lib/clients/graph.ts
import { ConfidentialClientApplication } from '@azure/msal-node';
import { Client } from '@microsoft/microsoft-graph-client';
import { TokenCredentialAuthenticationProvider } from
  '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials';
import { ClientSecretCredential } from '@azure/identity';

const credential = new ClientSecretCredential(
  process.env.AZURE_TENANT_ID!,
  process.env.AZURE_CLIENT_ID!,
  process.env.AZURE_CLIENT_SECRET!,
);

const authProvider = new TokenCredentialAuthenticationProvider(credential, {
  scopes: ['https://graph.microsoft.com/.default'],
});

export const graphClient = Client.initWithMiddleware({ authProvider });
```

## Reading Email

- Always read email on behalf of the service mailbox using `/users/{mailbox}/messages` — never `/me/messages` (daemon apps have no user context)
- The mailbox address is an environment variable: `O365_MAILBOX`
- Filter and page results — never load an unbounded inbox

```ts
// lib/clients/graph.ts
export async function fetchUnreadEmails(top = 25) {
  return graphClient
    .api(`/users/${process.env.O365_MAILBOX}/messages`)
    .filter('isRead eq false')
    .select('id,subject,from,receivedDateTime,body')
    .top(top)
    .get();
}
```

## Sending Email

- Send via `/users/{mailbox}/sendMail` — always specify `from` explicitly
- HTML body preferred for business emails; set `contentType` to `html`
- Helper function names: camelCase verb-first — `sendEmail()`, `replyToEmail()`, `forwardEmail()`

```ts
// lib/clients/graph.ts
export async function sendEmail(to: string, subject: string, body: string): Promise<void> {
  await graphClient.api(`/users/${process.env.O365_MAILBOX}/sendMail`).post({
    message: {
      subject,
      body: { contentType: 'html', content: body },
      toRecipients: [{ emailAddress: { address: to } }],
    },
  });
}
```

## Marking Emails as Read / Moving

- Mark as read after processing to prevent duplicate processing: `PATCH /users/{mailbox}/messages/{id}` with `{ isRead: true }`
- Move to a processed folder using `POST /users/{mailbox}/messages/{id}/move`
- Folder IDs are environment variables: `O365_FOLDER_PROCESSED`, `O365_FOLDER_ERRORS`

## AI Tool Integration

- Graph operations used by the AI agent are defined as tools in `/lib/tools/`
- Tool names: camelCase verb-first — `readUnreadEmails`, `sendBusinessEmail`, `markEmailRead`
- Tools call the typed wrapper functions — never call `graphClient.api(...)` directly inside a tool `execute` function

## Permissions (App Registration)

- Auth flow: **client credentials** (application permissions, no delegated user)
- Required Microsoft Graph application permissions:
  - `Mail.Read` — read mailbox messages
  - `Mail.Send` — send email as the mailbox
  - `Mail.ReadWrite` — mark as read, move messages
- Permissions are granted at the tenant level by an admin — document required scopes in `.env.example`

## Environment Variables

- `AZURE_TENANT_ID` — Azure AD tenant ID
- `AZURE_CLIENT_ID` — app registration client ID
- `AZURE_CLIENT_SECRET` — app registration client secret
- `O365_MAILBOX` — the mailbox address to read from and send as (e.g. `automation@example.com`)
- `O365_FOLDER_PROCESSED` — folder ID for processed emails
- Never log `AZURE_CLIENT_SECRET`
