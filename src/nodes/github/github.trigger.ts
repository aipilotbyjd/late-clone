import { NodeContext } from '../../interfaces/node.interface';

export class GitHubTrigger {
    type = 'github.trigger';
    name = 'GitHub Trigger';
    credentials = ['github'];

    async run(ctx: NodeContext) {
        return {
            message: 'GitHub trigger not yet implemented. Add webhook to repo and integrate with webhook controller.',
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
