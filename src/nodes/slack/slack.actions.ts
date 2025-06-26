import { NodeAction, NodeContext } from '../../interfaces/node.interface';
import axios from 'axios';
import FormData from 'form-data';

export const SlackActions: Record<string, NodeAction> = {
    sendMessage: {
        name: 'Send Message',
        description: 'Send a message to a Slack channel',
        run: async (ctx: NodeContext) => {
            const { channel, text } = ctx.params;
            const token = ctx.credentials['slack'].access_token;

            const res = await axios.post(
                'https://slack.com/api/chat.postMessage',
                { channel, text },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                },
            );

            return res.data;
        },
    },

    uploadFile: {
        name: 'Upload File',
        description: 'Upload a file to Slack',
        run: async (ctx: NodeContext) => {
            const { channel, content, filename } = ctx.params;
            const token = ctx.credentials['slack'].access_token;

            const form = new FormData();
            form.append('channels', channel);
            form.append('content', content);
            form.append('filename', filename);

            const res = await axios.post('https://slack.com/api/files.upload', form, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    ...form.getHeaders(),
                },
            });

            return res.data;
        },
    },
};
