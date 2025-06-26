export interface Workflow {
    id: string;
    name: string;
    description?: string;
    version: string;
    createdAt: Date;
    updatedAt: Date;
    nodes: WorkflowNode[];
    connections: WorkflowConnection[];
}

export interface WorkflowNode {
    id: string;
    type: string; // e.g., 'slack', 'http', 'google-sheets'
    name: string;
    position: { x: number; y: number };
    data: Record<string, any>; // Node settings (e.g., channel, credentials ref, etc.)
}

export interface WorkflowConnection {
    from: {
        nodeId: string;
        output: string;
    };
    to: {
        nodeId: string;
        input: string;
    };
}
