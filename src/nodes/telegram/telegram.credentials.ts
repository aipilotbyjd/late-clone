export interface TelegramCredentials {
  botToken: string;
}

export const TelegramCredentialsSchema = {
  name: 'Telegram',
  displayName: 'Telegram',
  properties: {
    botToken: {
      displayName: 'Bot Token',
      name: 'botToken',
      type: 'string' as const,
      typeOptions: {
        password: true,
      },
      default: '',
      required: true,
      description: 'The bot token for Telegram Bot API',
    },
  },
};
