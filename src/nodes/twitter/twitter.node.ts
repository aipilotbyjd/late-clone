import { BaseNode } from '../base.node';
import { TwitterActions } from './twitter.actions';

export class TwitterNode extends BaseNode {
  type = 'twitter';
  name = 'Twitter';
  credentials = ['twitter'];
  actions = TwitterActions;
}
