import { NodeAction, NodeContext } from '../../interfaces/node.interface';
import axios from 'axios';

export const TelegramActions: Record<string, NodeAction> = {
  sendMessage: {
    name: 'Send Message',
    description: 'Send a message to a Telegram chat',
    async run(ctx: NodeContext): Promise<any> {
      const { botToken } = ctx.credentials.telegram;
      const { chatId, text, parse_mode, reply_markup } = ctx.params;

      const response = await axios.post(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          chat_id: chatId,
          text,
          parse_mode: parse_mode || 'HTML',
          reply_markup,
        },
      );

      return response.data;
    },
  },

  sendPhoto: {
    name: 'Send Photo',
    description: 'Send a photo to a Telegram chat',
    async run(ctx: NodeContext): Promise<any> {
      const { botToken } = ctx.credentials.telegram;
      const { chatId, photo, caption, parse_mode } = ctx.params;

      const response = await axios.post(
        `https://api.telegram.org/bot${botToken}/sendPhoto`,
        {
          chat_id: chatId,
          photo,
          caption,
          parse_mode: parse_mode || 'HTML',
        },
      );

      return response.data;
    },
  },

  sendDocument: {
    name: 'Send Document',
    description: 'Send a document to a Telegram chat',
    async run(ctx: NodeContext): Promise<any> {
      const { botToken } = ctx.credentials.telegram;
      const { chatId, document, caption, parse_mode } = ctx.params;

      const response = await axios.post(
        `https://api.telegram.org/bot${botToken}/sendDocument`,
        {
          chat_id: chatId,
          document,
          caption,
          parse_mode: parse_mode || 'HTML',
        },
      );

      return response.data;
    },
  },

  editMessage: {
    name: 'Edit Message',
    description: 'Edit an existing message',
    async run(ctx: NodeContext): Promise<any> {
      const { botToken } = ctx.credentials.telegram;
      const { chatId, messageId, text, parse_mode, reply_markup } = ctx.params;

      const response = await axios.post(
        `https://api.telegram.org/bot${botToken}/editMessageText`,
        {
          chat_id: chatId,
          message_id: messageId,
          text,
          parse_mode: parse_mode || 'HTML',
          reply_markup,
        },
      );

      return response.data;
    },
  },
};
