import { Injectable, Inject } from '@nestjs/common';
import { NODE_REGISTRY } from '../registry/node.registry';

@Injectable()
export class NodeExecutor {
  constructor(@Inject(NODE_REGISTRY) private readonly registry: Map<string, any>) { }

  async execute(node: any, inputs: any[]): Promise<any> {
    const instance = this.registry.get(node.type);
    if (!instance) throw new Error(`Node type ${node.type} not registered`);

    if (typeof instance.execute !== 'function') {
      throw new Error(`Node ${node.type} has no execute method`);
    }

    return instance.execute({ params: node.params, input: inputs });
  }
}
