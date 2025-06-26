import { NodeAction, NodeContext } from '../../interfaces/node.interface';
import axios from 'axios';

const BASE_URL = 'https://sheets.googleapis.com/v4/spreadsheets';

export const GoogleSheetsActions: Record<string, NodeAction> = {
    appendRow: {
        name: 'Append Row',
        description: 'Append a new row to the given sheet',
        run: async (ctx: NodeContext) => {
            const { spreadsheetId, range, values } = ctx.params;
            const token = ctx.credentials['google-sheets'].access_token;

            const res = await axios.post(
                `${BASE_URL}/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`,
                { values: [values] },
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );

            return res.data;
        },
    },

    readRows: {
        name: 'Read Rows',
        description: 'Read data from a sheet',
        run: async (ctx: NodeContext) => {
            const { spreadsheetId, range } = ctx.params;
            const token = ctx.credentials['google-sheets'].access_token;

            const res = await axios.get(
                `${BASE_URL}/${spreadsheetId}/values/${range}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );

            return res.data;
        },
    },

    updateCell: {
        name: 'Update Cell',
        description: 'Update a specific cell',
        run: async (ctx: NodeContext) => {
            const { spreadsheetId, range, value } = ctx.params;
            const token = ctx.credentials['google-sheets'].access_token;

            const res = await axios.put(
                `${BASE_URL}/${spreadsheetId}/values/${range}?valueInputOption=USER_ENTERED`,
                { values: [[value]] },
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );

            return res.data;
        },
    },
};
