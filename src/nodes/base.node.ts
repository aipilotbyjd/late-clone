import { NodeContext, NodeAction } from '../interfaces/node.interface';

export abstract class BaseNode {
    abstract type: string;
    abstract name: string;
    abstract credentials?: string[];

    abstract actions: Record<string, NodeAction>;

    getMetadata() {
        return {
            type: this.type,
            name: this.name,
            actions: Object.keys(this.actions),
            credentials: this.credentials ?? [],
        };
    }

    validate(ctx: NodeContext): void {
        // Ensure the action specified in params exists for this node.
        // This check is primarily for nodes that have a defined set of actions in their `actions` property.
        // If a node has a generic run method and doesn't use ctx.action, this check might be too strict
        // or need adjustment based on node design.
        // However, for the common pattern where BaseNode.run delegates to an action in this.actions, it's important.
        if (ctx.params?.action && this.actions && !this.actions[ctx.params.action]) {
            throw new Error(`Action "${ctx.params.action}" is invalid or not defined for node type "${this.type}".`);
        }
        // If the node itself doesn't define a generic run and relies on actions, but no action is specified.
        // This is a bit tricky as some nodes might be single-action and not require ctx.params.action if BaseNode.run is overridden.
        // For now, if actions are defined, an action parameter is expected.
        if (this.actions && Object.keys(this.actions).length > 0 && !ctx.params?.action && typeof this.run === 'function' && this.run === BaseNode.prototype.run) {
            // This condition checks if the node uses the BaseNode's run method (which delegates to an action)
            // AND has defined actions, but no action was provided in the parameters.
            throw new Error(`No action specified for node type "${this.type}". Available actions: ${Object.keys(this.actions).join(', ')}.`);
        }

        if (this.credentials) {
            for (const credName of this.credentials) {
                const credentialData = ctx.credentials[credName];
                if (!credentialData || Object.keys(credentialData).length === 0) {
                    throw new Error(`Credentials "${credName}" are missing or empty for node type "${this.type}". Please configure them.`);
                }
            }
        }
    }

    async run(ctx: NodeContext): Promise<any> {
        this.validate(ctx);
        return this.actions[ctx.action].run(ctx);
    }
}
