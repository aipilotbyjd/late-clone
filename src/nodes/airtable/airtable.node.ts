import { BaseNode } from '../base.node';
import { AirtableActions } from './airtable.actions';

export class AirtableNode extends BaseNode {
  type = 'airtable';
  name = 'Airtable';
  credentials = ['airtable'];
  actions = AirtableActions;
}
