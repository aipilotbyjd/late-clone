import { BaseNode } from '../base.node';
import { EmailActions } from './email.actions';

export class EmailNode extends BaseNode {
  type = 'email';
  name = 'Email';
  credentials = ['email'];
  actions = EmailActions;
}
