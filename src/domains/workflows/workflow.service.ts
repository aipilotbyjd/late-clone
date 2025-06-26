import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkflowEntity } from './workflow.entity';
import { WorkflowVersionEntity } from './workflow_version.entity';

@Injectable()
export class WorkflowService {
    constructor(
        @InjectRepository(WorkflowEntity)
        private readonly workflowRepo: Repository<WorkflowEntity>,
        @InjectRepository(WorkflowVersionEntity)
        private readonly versionRepo: Repository<WorkflowVersionEntity>,
    ) { }

    async createWorkflow(data: { name: string; description?: string; definition: any }) {
        const workflow = await this.workflowRepo.save({
            name: data.name,
            description: data.description,
            isActive: true,
        });

        const version = await this.versionRepo.save({
            workflow,
            version: '1.0.0',
            definition: data.definition,
        });

        return { workflow, version };
    }

    async updateWorkflow(workflowId: string, definition: any) {
        const workflow = await this.workflowRepo.findOneOrFail({ where: { id: workflowId } });
        const versions = await this.versionRepo.find({ where: { workflow }, order: { createdAt: 'DESC' } });

        const latestVersion = versions[0]?.version || '0.0.0';
        const [major, minor, patch] = latestVersion.split('.').map(Number);
        const nextVersion = `${major}.${minor}.${patch + 1}`;

        const version = await this.versionRepo.save({
            workflow,
            version: nextVersion,
            definition,
        });

        return version;
    }

    async getWorkflow(id: string) {
        const workflow = await this.workflowRepo.findOne({
            where: { id },
            relations: ['versions'],
        });

        const latest = workflow?.versions?.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0];

        return {
            ...workflow,
            latestVersion: latest,
        };
    }

    async listWorkflows() {
        return this.workflowRepo.find({ order: { updatedAt: 'DESC' } });
    }
}
