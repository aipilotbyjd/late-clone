export type NodeType = 'action' | 'trigger' | 'utility';

/**
 * Runtime context passed to node during execution
 */
export interface NodeContext {
  params: Record<string, any>;
  credentials: Record<string, any>;
  previousResult?: any;
  workflowId?: string;
  userId?: string;
  [key: string]: any;
}

/**
 * Single named action inside a node (Slack.sendMessage, GitHub.createIssue)
 */
export interface NodeAction {
  name: string;
  description?: string;
  run(ctx: NodeContext): Promise<any>;
}

/**
 * RegisteredNode is used in the registry for dynamic node loading
 */
export interface RegisteredNode {
  type: string; // e.g. 'slack', 'http'
  name: string; // Display name
  credentials?: string[]; // List of required credentials
  actions?: Record<string, NodeAction>; // Multiple actions (for UI/trigger mapping)
  run?: (ctx: NodeContext) => Promise<any>; // Optional default run (for single-action nodes)
  getMetadata?: () => { type: string; name: string };
}

/**
 * Static node definition used to describe each node type
 */
export interface NodeDefinition {
  name: string;
  description: string;
  category: string;
  type: NodeType; // 'action', 'trigger', etc.
  inputs: string[]; // Port names for incoming data
  outputs: string[]; // Port names for output data

  run(input: Record<string, any>, context?: NodeExecutionContext): Promise<any>;
}

/**
 * Runtime execution context passed to NodeDefinition.run()
 */
export interface NodeExecutionContext {
  credentials?: Record<string, any>;
  previousOutput?: any;
  workflowId?: string;
  userId?: string;
  [key: string]: any;
}
