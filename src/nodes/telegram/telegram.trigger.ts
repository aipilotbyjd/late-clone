import { NodeAction, NodeContext } from '../../interfaces/node.interface';

export const TelegramTrigger: NodeAction = {
  name: 'Telegram Message Trigger',
  description: 'Triggers when a new message is received',
  async run(ctx: NodeContext): Promise<any> {
    // This would typically set up a webhook or polling mechanism
    // For now, return a placeholder
    return {
      message: 'Telegram trigger configured',
      params: ctx.params,
    };
  },
};
