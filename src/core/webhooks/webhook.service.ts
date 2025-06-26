import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WebhookEntity } from './webhook.entity';
import { ExecutionService } from '../../domains/executions/execution.service';

@Injectable()
export class WebhookService {
    private readonly logger = new Logger(WebhookService.name);

    constructor(
        @InjectRepository(WebhookEntity)
        private readonly repo: Repository<WebhookEntity>,
        private readonly executionService: ExecutionService,
    ) { }

    async create(path: string, workflowId: string, config?: any) {
        return this.repo.save({ path, workflowId, config });
    }

    async findByPath(path: string) {
        return this.repo.findOne({ where: { path } });
    }

    async handleIncoming(path: string, payload: any) {
        const hook = await this.findByPath(path);
        if (!hook) {
            this.logger.warn(`No webhook configured for path: ${path}`);
            return;
        }
        this.logger.log(`Webhook hit for workflow ${hook.workflowId}`);
        await this.executionService.start(hook.workflowId, payload);
    }
}
