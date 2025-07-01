import { NodeContext } from '../../interfaces/node.interface';

export class GoogleSheetsTrigger {
  type = 'google-sheets.trigger';
  name = 'Google Sheets Trigger';
  credentials = ['google-sheets'];

  async run(ctx: NodeContext) {
    return {
      message: 'Google Sheets trigger not implemented — use polling/scheduler.',
    };
  }

  getMetadata() {
    return {
      type: this.type,
      name: this.name,
      credentials: this.credentials,
    };
  }
}
