import { BaseNode } from '../base.node';
import { TelegramActions } from './telegram.actions';

export class TelegramNode extends BaseNode {
  type = 'telegram';
  name = 'Telegram';
  credentials = ['telegram'];
  actions = TelegramActions;
}
