// Export all node classes
export { SlackNode } from './slack/slack.node';
export { GitHubNode } from './github/github.node';
export { GoogleSheetsNode } from './google-sheets/sheet.node';
export { HttpNode } from './http/http.node';

// New nodes
export { DiscordNode } from './discord/discord.node';
export { NotionNode } from './notion/notion.node';
export { TelegramNode } from './telegram/telegram.node';
export { AirtableNode } from './airtable/airtable.node';
export { EmailNode } from './email/email.node';
export { TwitterNode } from './twitter/twitter.node';

// Export base class
export { BaseNode } from './base.node';

// Node registry for easy registration
export const ALL_NODES = [
  'slack',
  'github',
  'google-sheets',
  'http',
  'discord',
  'notion',
  'telegram',
  'airtable',
  'email',
  'twitter',
] as const;
