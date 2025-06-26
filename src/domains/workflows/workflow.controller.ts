import { Controller, Post, Get, Body, Param, Put } from '@nestjs/common';
import { WorkflowService } from './workflow.service';

@Controller('workflows')
export class WorkflowController {
    constructor(private readonly workflowService: WorkflowService) { }

    @Post()
    async create(@Body() body: { name: string; description?: string; definition: any }) {
        return this.workflowService.createWorkflow(body);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: { definition: any }) {
        return this.workflowService.updateWorkflow(id, body.definition);
    }

    @Get(':id')
    async get(@Param('id') id: string) {
        return this.workflowService.getWorkflow(id);
    }

    @Get()
    async list() {
        return this.workflowService.listWorkflows();
    }
}
