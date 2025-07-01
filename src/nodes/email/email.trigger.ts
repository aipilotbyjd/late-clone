import { NodeAction, NodeContext } from '../../interfaces/node.interface';

export const EmailTrigger: NodeAction = {
  name: 'Email Received Trigger',
  description: 'Triggers when a new email is received (IMAP)',
  async run(ctx: NodeContext): Promise<any> {
    // This would typically set up IMAP polling mechanism
    // For now, return a placeholder
    return {
      message: 'Email trigger configured',
      params: ctx.params,
    };
  },
};
