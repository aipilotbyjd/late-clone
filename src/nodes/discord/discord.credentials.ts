export interface DiscordCredentials {
  botToken: string;
  webhookUrl?: string;
}

export const DiscordCredentialsSchema = {
  name: 'Discord',
  displayName: 'Discord',
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
      description: 'The bot token for Discord API access',
    },
    webhookUrl: {
      displayName: 'Webhook URL',
      name: 'webhookUrl',
      type: 'string' as const,
      default: '',
      required: false,
      description: 'Discord webhook URL (optional)',
    },
  },
};
