import { NodeAction, NodeContext } from '../../interfaces/node.interface';

export const AirtableTrigger: NodeAction = {
  name: 'Airtable Record Change Trigger',
  description: 'Triggers when a record is created or updated in Airtable',
  async run(ctx: NodeContext): Promise<any> {
    // This would typically set up polling mechanism
    // For now, return a placeholder
    return {
      message: 'Airtable trigger configured',
      params: ctx.params,
    };
  },
};
