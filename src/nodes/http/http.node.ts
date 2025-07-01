import { BaseNode } from '../base.node';
import { HttpActions } from './http.actions';

export class HttpNode extends BaseNode {
  type = 'http';
  name = 'HTTP Request';
  credentials = [];
  actions = HttpActions;
}
