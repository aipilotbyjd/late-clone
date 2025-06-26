import { BaseNode } from '../base.node';
import { SlackActions } from './slack.actions';

export class SlackNode extends BaseNode {
    type = 'slack';
    name = 'Slack';
    credentials = ['slack'];
    actions = SlackActions;
}
