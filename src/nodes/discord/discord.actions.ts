import { NodeAction, NodeContext } from '../../interfaces/node.interface';
import axios from 'axios';

export const DiscordActions: Record<string, NodeAction> = {
  sendMessage: {
    name: 'Send Message',
    description: 'Send a message to a Discord channel',
    async run(ctx: NodeContext): Promise<any> {
      const { botToken } = ctx.credentials.discord;
      const { channelId, content, embeds } = ctx.params;

      const response = await axios.post(
        `https://discord.com/api/v10/channels/${channelId}/messages`,
        {
          content,
          embeds: embeds || [],
        },
        {
          headers: {
            Authorization: `Bot ${botToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data;
    },
  },

  sendWebhookMessage: {
    name: 'Send Webhook Message',
    description: 'Send a message via Discord webhook',
    async run(ctx: NodeContext): Promise<any> {
      const { webhookUrl } = ctx.credentials.discord;
      const { content, username, avatar_url, embeds } = ctx.params;

      const response = await axios.post(webhookUrl, {
        content,
        username,
        avatar_url,
        embeds: embeds || [],
      });

      return response.data;
    },
  },

  createChannel: {
    name: 'Create Channel',
    description: 'Create a new Discord channel',
    async run(ctx: NodeContext): Promise<any> {
      const { botToken } = ctx.credentials.discord;
      const { guildId, name, type, topic } = ctx.params;

      const response = await axios.post(
        `https://discord.com/api/v10/guilds/${guildId}/channels`,
        {
          name,
          type: type || 0, // 0 = text channel
          topic,
        },
        {
          headers: {
            Authorization: `Bot ${botToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data;
    },
  },
};
