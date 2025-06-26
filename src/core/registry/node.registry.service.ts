import { Injectable } from '@nestjs/common';
import { RegisteredNode } from '../../interfaces/node.interface';

@Injectable()
export class NodeRegistryService {
    private readonly registry = new Map<string, RegisteredNode>();

    /**
     * Register a node under the given type key.
     * Subsequent registrations for the same type are ignored.
     */
    register(type: string, node: RegisteredNode): void {
        if (!this.registry.has(type)) {
            this.registry.set(type, node);
        }
    }

    /**
     * Retrieve a registered node by its type key.
     */
    get(type: string): RegisteredNode | undefined {
        return this.registry.get(type);
    }

    /**
     * List metadata for all registered nodes.
     */
    all(): Array<{ type: string; name: string }> {
        return Array.from(this.registry.entries()).map(([type, node]) => ({
            type,
            name: node.name,
        }));
    }
}
