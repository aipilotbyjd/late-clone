import { Injectable } from '@nestjs/common';
import { RegisteredNode } from '../../interfaces/node.interface';

@Injectable()
export class NodeRegistryService {
    private readonly registry = new Map<string, RegisteredNode>();

    register(type: string, node: RegisteredNode): void {
        if (!this.registry.has(type)) {
            this.registry.set(type, node);
        }
    }

    get(type: string): RegisteredNode | undefined {
        return this.registry.get(type);
    }

    all(): Array<{ type: string; name: string }> {
        return Array.from(this.registry.entries()).map(([type, node]) => ({
            type,
            name: node.name,
        }));
    }
}
