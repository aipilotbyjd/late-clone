import { NodeContext } from '../../interfaces/node.interface';

export class SlackTrigger {
  type = 'slack.trigger';
  name = 'Slack Trigger';
  credentials = ['slack'];

  async run(ctx: NodeContext): Promise<any> {
    // Just an example. Real trigger would require Slack Events API subscription.
    return {
      message:
        'Slack trigger placeholder — configure events via webhook module.',
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
