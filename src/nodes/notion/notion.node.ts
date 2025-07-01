import { BaseNode } from '../base.node';
import { NotionActions } from './notion.actions';

export class NotionNode extends BaseNode {
  type = 'notion';
  name = 'Notion';
  credentials = ['notion'];
  actions = NotionActions;
}
