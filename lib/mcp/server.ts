import { FastMCP } from 'fastmcp';

import { listAirtableTables } from './tools/list-airtable-tables.js';

export const automationServer = new FastMCP('Business Automation');

automationServer.addTool(listAirtableTables);

automationServer.start({ transportType: 'stdio' });
