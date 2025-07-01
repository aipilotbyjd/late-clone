import { Injectable, Inject } from '@nestjs/common';
import { NODE_REGISTRY } from '../registry/constants';
import { RegisteredNode, NodeContext } from '../../interfaces/node.interface';

@Injectable()
export class NodeExecutor {
  constructor(
    @Inject(NODE_REGISTRY)
    private readonly registry: Map<string, RegisteredNode>,
  ) {}

  /**
   * Execute a single node instance.
   * @param node   Persisted node config, e.g. { type, params }
   * @param inputs Array of upstream node outputs
   */
  async execute(
    node: { type: string; params: any },
    inputs: any[],
  ): Promise<any> {
    const instance = this.registry.get(node.type);
    if (!instance) {
      throw new Error(`Node type "${node.type}" not registered`);
    }

    // Multi-action nodes use `actions`
    if (instance.actions && typeof node.params.action === 'string') {
      const action = instance.actions[node.params.action];
      if (!action) {
        throw new Error(
          `Action "${node.params.action}" not found on node "${node.type}"`,
        );
      }
      return action.run({
        params: node.params,
        credentials: {},
        previousResult: inputs,
      });
    }

    // Single-action nodes use run()
    if (typeof instance.run !== 'function') {
      throw new Error(`Node "${node.type}" has no run() method`);
    }

    return instance.run({
      params: node.params,
      credentials: {},
      previousResult: inputs,
    } as NodeContext);
  }
}
