import { z } from 'zod';

import { listTables } from '@/lib/clients/airtable.js';

export const listAirtableTables = {
  name: 'listAirtableTables',
  description:
    'List all tables in the configured Airtable base. Returns each table\'s ID and name.',
  parameters: z.object({}),
  execute: async () => {
    const tables = await listTables();
    return tables.map(t => `${t.name} (${t.id})`).join('\n');
  },
};
