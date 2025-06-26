import { NodeContext } from '../../interfaces/node.interface';

export class HttpTrigger {
    type = 'http.trigger';
    name = 'HTTP Webhook Trigger';

    async run(ctx: NodeContext) {
        return {
            message: 'Trigger pending — will work via webhook module',
        };
    }

    getMetadata() {
        return {
            type: this.type,
            name: this.name,
        };
    }
}
