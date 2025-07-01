import { NodeAction, NodeContext } from '../../interfaces/node.interface';
import axios from 'axios';

export const NotionActions: Record<string, NodeAction> = {
  createPage: {
    name: 'Create Page',
    description: 'Create a new page in Notion',
    async run(ctx: NodeContext): Promise<any> {
      const { apiKey } = ctx.credentials.notion;
      const { parent, properties, children } = ctx.params;

      const response = await axios.post(
        'https://api.notion.com/v1/pages',
        {
          parent,
          properties,
          children: children || [],
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'Notion-Version': '2022-06-28',
          },
        },
      );

      return response.data;
    },
  },

  updatePage: {
    name: 'Update Page',
    description: 'Update an existing page in Notion',
    async run(ctx: NodeContext): Promise<any> {
      const { apiKey } = ctx.credentials.notion;
      const { pageId, properties } = ctx.params;

      const response = await axios.patch(
        `https://api.notion.com/v1/pages/${pageId}`,
        {
          properties,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'Notion-Version': '2022-06-28',
          },
        },
      );

      return response.data;
    },
  },

  queryDatabase: {
    name: 'Query Database',
    description: 'Query a Notion database',
    async run(ctx: NodeContext): Promise<any> {
      const { apiKey } = ctx.credentials.notion;
      const { databaseId, filter, sorts } = ctx.params;

      const response = await axios.post(
        `https://api.notion.com/v1/databases/${databaseId}/query`,
        {
          filter,
          sorts,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'Notion-Version': '2022-06-28',
          },
        },
      );

      return response.data;
    },
  },

  createDatabaseEntry: {
    name: 'Create Database Entry',
    description: 'Create a new entry in a Notion database',
    async run(ctx: NodeContext): Promise<any> {
      const { apiKey } = ctx.credentials.notion;
      const { databaseId, properties } = ctx.params;

      const response = await axios.post(
        'https://api.notion.com/v1/pages',
        {
          parent: {
            database_id: databaseId,
          },
          properties,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'Notion-Version': '2022-06-28',
          },
        },
      );

      return response.data;
    },
  },
};
