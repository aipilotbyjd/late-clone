import { Injectable, Inject, Logger } from '@nestjs/common';
import { NODE_REGISTRY } from '../registry/constants';
import { RegisteredNode, NodeContext } from '../../interfaces/node.interface';
import { CredentialsService } from '../../domains/credentials/credentials.service';

@Injectable()
export class NodeExecutor {
  private readonly logger = new Logger(NodeExecutor.name);

  constructor(
    @Inject(NODE_REGISTRY)
    private readonly registry: Map<string, RegisteredNode>,
    private readonly credentialsService: CredentialsService,
  ) { }

  /**
   * Execute a single node instance.
   * @param node   Persisted node config, e.g. { type, params }
   * @param inputs Array of upstream node outputs
   * @param userId The ID of the user executing the workflow
   */
  async execute(node: { type: string; params: any }, inputs: any[], userId: string): Promise<any> {
    const instance = this.registry.get(node.type);
    if (!instance) {
      throw new Error(`Node type "${node.type}" not registered`);
    }

    const nodeCredentials: Record<string, any> = {};
    if (instance.credentials && userId) {
      for (const credName of instance.credentials) {
        try {
          const cred = await this.credentialsService.getCredential(credName, userId);
          if (cred) {
            nodeCredentials[credName] = cred.data;
          } else {
            this.logger.warn(`Credential "${credName}" not found for user ${userId} and node type "${node.type}"`);
            // Decide if this is a fatal error or if the node can handle missing credentials
            // For now, we'll pass an empty object for that credential.
            nodeCredentials[credName] = {};
          }
        } catch (error) {
          this.logger.error(`Error fetching credential "${credName}" for user ${userId}: ${error.message}`, error.stack);
          // Decide error handling: throw, or let node handle it
          nodeCredentials[credName] = {};
        }
      }
    } else if (instance.credentials && !userId) {
        this.logger.warn(`Node type "${node.type}" requires credentials, but no userId was provided.`);
        // Pass empty credentials for all required types if no userId
        for (const credName of instance.credentials) {
            nodeCredentials[credName] = {};
        }
    }


    const context: NodeContext = {
      params: node.params,
      credentials: nodeCredentials,
      previousResult: inputs,
      userId: userId, // Pass userId to the node context as well
      // workflowId will be added if/when available and needed
    };

    // Multi-action nodes use `actions`
    if (instance.actions && typeof node.params.action === 'string') {
      const action = instance.actions[node.params.action];
      if (!action) {
        throw new Error(`Action "${node.params.action}" not found on node "${node.type}"`);
      }
      return action.run(context);
    }

    // Single-action nodes use run()
    if (typeof instance.run !== 'function') {
      throw new Error(`Node "${node.type}" has no run() method`);
    }

    return instance.run(context);
  }
}
