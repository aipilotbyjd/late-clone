import { BaseNode } from '../base.node';
import { GitHubActions } from './github.actions';

export class GitHubNode extends BaseNode {
  type = 'github';
  name = 'GitHub';
  credentials = ['github'];
  actions = GitHubActions;
}
