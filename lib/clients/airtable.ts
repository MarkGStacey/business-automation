import Airtable from 'airtable';

Airtable.configure({ apiKey: process.env.AIRTABLE_API_KEY });

export const airtable = Airtable;
export const mainBase = airtable.base(process.env.AIRTABLE_BASE_ID!);

type AirtableTable = {
  id: string;
  name: string;
};

type AirtableTablesResponse = {
  tables: AirtableTable[];
};

export async function listTables(): Promise<AirtableTable[]> {
  const response = await fetch(
    `https://api.airtable.com/v0/meta/bases/${process.env.AIRTABLE_BASE_ID}/tables`,
    {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Airtable metadata API error: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as AirtableTablesResponse;
  return data.tables.map(t => ({ id: t.id, name: t.name }));
}
