import { NodeContext, NodeAction } from '../../interfaces/node.interface';
import axios from 'axios';

export const HttpActions: Record<string, NodeAction> = {
  request: {
    name: 'Make HTTP Request',
    description: 'Send any HTTP request',
    run: async (ctx: NodeContext) => {
      const {
        method = 'GET',
        url,
        headers = {},
        body = {},
        params = {},
      } = ctx.params;

      const res = await axios({
        method,
        url,
        headers,
        params,
        data: method !== 'GET' ? body : undefined,
      });

      return res.data;
    },
  },
};
