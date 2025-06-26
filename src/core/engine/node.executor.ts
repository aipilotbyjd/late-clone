import { Injectable, Inject } from '@nestjs/common';
import { NODE_REGISTRY } from '../registry/constants';
import { RegisteredNode, NodeContext } from '../../interfaces/node.interface';

@Injectable()
export class NodeExecutor {
  constructor(
    @Inject(NODE_REGISTRY)
    private readonly registry: Map<string, RegisteredNode>,
  ) { }

  async execute(node: { type: string; params: any }, inputs: any[]): Promise<any> {
    const instance = this.registry.get(node.type);
    if (!instance) {
      throw new Error(`Node type "${node.type}" not registered`);
    }

    // If multi-action node
    if (instance.actions && typeof node.params.action === 'string') {
      const action = instance.actions[node.params.action];
      if (!action) {
        throw new Error(`Action "${node.params.action}" not found on node "${node.type}"`);
      }
      return action.run({ params: node.params, credentials: {}, previousResult: inputs });
    }

    // Fallback to default run()
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
