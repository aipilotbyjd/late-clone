import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ExecutionService } from '../../domains/executions/execution.service';
import { WorkflowService } from '../../domains/workflows/workflow.service';

@Injectable()
export class TriggerJobsService {
    private readonly logger = new Logger(TriggerJobsService.name);

    constructor(
        private readonly workflowService: WorkflowService,
        private readonly executionService: ExecutionService,
    ) { }

    // Runs every minute and triggers any workflows configured with a cron schedule
    @Cron(CronExpression.EVERY_MINUTE)
    async handleCronTriggers() {
        this.logger.debug('Checking cron-triggered workflows...');
        // Assume workflows with a `cronExpression` in their latest definition
        const all = await this.workflowService.listWorkflows();
        for (const wf of all) {
            const latest = wf.versions?.[0]?.definition; // adjust per your versioning
            const cronExpr = latest?.trigger?.cronExpression;
            if (cronExpr) {
                // Note: Ideally compare `cronExpr` to NOW; simplified here to run all
                this.logger.log(`Triggering workflow ${wf.id} via cron`);
                await this.executionService.start(wf.id, {});
            }
        }
    }
}
