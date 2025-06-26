import { BaseNode } from '../base.node';
import { GoogleSheetsActions } from './sheet.actions';

export class GoogleSheetsNode extends BaseNode {
    type = 'google-sheets';
    name = 'Google Sheets';
    credentials = ['google-sheets'];
    actions = GoogleSheetsActions;
}
