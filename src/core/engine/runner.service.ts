import { Injectable, Logger } from '@nestjs/common';
import { NodeExecutor } from './node.executor';

@Injectable()
export class RunnerService {
    private readonly logger = new Logger(RunnerService.name);

    constructor(private readonly nodeExecutor: NodeExecutor) { }

    async run(workflow: any, input: any = {}) {
        const { nodes, connections } = workflow;

        const results: Record<string, any> = {};
        const visited = new Set<string>();

        const runNode = async (nodeId: string) => {
            if (visited.has(nodeId)) return results[nodeId];
            const node = nodes.find((n: any) => n.id === nodeId);
            if (!node) throw new Error(`Node ${nodeId} not found`);

            const incoming = connections[nodeId] || [];
            const inputData = incoming.length
                ? await Promise.all(incoming.map((fromId: string) => runNode(fromId)))
                : [input];

            const result = await this.nodeExecutor.execute(node, inputData);
            results[nodeId] = result;
            visited.add(nodeId);
            return result;
        };

        const startNodes = workflow.startNodes || nodes.filter((n: any) => n.type === 'trigger');
        for (const start of startNodes) {
            await runNode(start.id);
        }

        return results;
    }
}
