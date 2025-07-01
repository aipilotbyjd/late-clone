import { NodeAction, NodeContext } from '../../interfaces/node.interface';
import axios from 'axios';

export const AirtableActions: Record<string, NodeAction> = {
  createRecord: {
    name: 'Create Record',
    description: 'Create a new record in an Airtable base',
    async run(ctx: NodeContext): Promise<any> {
      const { apiKey } = ctx.credentials.airtable;
      const { baseId, tableId, fields } = ctx.params;

      const response = await axios.post(
        `https://api.airtable.com/v0/${baseId}/${tableId}`,
        {
          fields,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data;
    },
  },

  updateRecord: {
    name: 'Update Record',
    description: 'Update an existing record in Airtable',
    async run(ctx: NodeContext): Promise<any> {
      const { apiKey } = ctx.credentials.airtable;
      const { baseId, tableId, recordId, fields } = ctx.params;

      const response = await axios.patch(
        `https://api.airtable.com/v0/${baseId}/${tableId}/${recordId}`,
        {
          fields,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data;
    },
  },

  getRecords: {
    name: 'Get Records',
    description: 'Retrieve records from an Airtable base',
    async run(ctx: NodeContext): Promise<any> {
      const { apiKey } = ctx.credentials.airtable;
      const { baseId, tableId, maxRecords, view, filterByFormula } = ctx.params;

      const params = new URLSearchParams();
      if (maxRecords) params.append('maxRecords', maxRecords.toString());
      if (view) params.append('view', view);
      if (filterByFormula) params.append('filterByFormula', filterByFormula);

      const response = await axios.get(
        `https://api.airtable.com/v0/${baseId}/${tableId}?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        },
      );

      return response.data;
    },
  },

  deleteRecord: {
    name: 'Delete Record',
    description: 'Delete a record from Airtable',
    async run(ctx: NodeContext): Promise<any> {
      const { apiKey } = ctx.credentials.airtable;
      const { baseId, tableId, recordId } = ctx.params;

      const response = await axios.delete(
        `https://api.airtable.com/v0/${baseId}/${tableId}/${recordId}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        },
      );

      return response.data;
    },
  },
};
