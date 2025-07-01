import { BaseNode } from '../base.node';
import { DiscordActions } from './discord.actions';

export class DiscordNode extends BaseNode {
  type = 'discord';
  name = 'Discord';
  credentials = ['discord'];
  actions = DiscordActions;
}
