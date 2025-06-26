import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExecutionEntity } from './execution.entity';
import { ExecutionLogEntity } from './execution_log.entity';

@Injectable()
export class ExecutionService {
    constructor(
        @InjectRepository(ExecutionEntity)
        private readonly executionRepo: Repository<ExecutionEntity>,
        @InjectRepository(ExecutionLogEntity)
        private readonly logRepo: Repository<ExecutionLogEntity>,
    ) { }

    async start(workflowId: string, input: any) {
        return this.executionRepo.save({
            workflow: { id: workflowId },
            status: 'running',
            input,
        });
    }

    async complete(id: string, output: any) {
        return this.executionRepo.update(id, {
            status: 'success',
            output,
        });
    }

    async fail(id: string, error: any) {
        return this.executionRepo.update(id, {
            status: 'error',
            error,
        });
    }

    async log(executionId: string, nodeId: string, input: any, output: any, error: any = null) {
        return this.logRepo.save({
            execution: { id: executionId },
            nodeId,
            input,
            output,
            error,
        });
    }

    async get(id: string) {
        return this.executionRepo.findOne({
            where: { id },
        });
    }

    async list() {
        return this.executionRepo.find({ order: { startedAt: 'DESC' } });
    }
}
