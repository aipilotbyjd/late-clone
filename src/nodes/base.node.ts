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
        if (!ctx.action || !this.actions[ctx.action]) {
            throw new Error(`Invalid or missing action: ${ctx.action}`);
        }
        if (this.credentials) {
            for (const c of this.credentials) {
                if (!ctx.credentials[c]) {
                    throw new Error(`Missing credentials for: ${c}`);
                }
            }
        }
    }

    async run(ctx: NodeContext): Promise<any> {
        this.validate(ctx);
        return this.actions[ctx.action].run(ctx);
    }
}
