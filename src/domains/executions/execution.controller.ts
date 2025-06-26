import { Controller, Get, Param } from '@nestjs/common';
import { ExecutionService } from './execution.service';

@Controller('executions')
export class ExecutionController {
    constructor(private readonly executionService: ExecutionService) { }

    @Get()
    async list() {
        return this.executionService.list();
    }

    @Get(':id')
    async get(@Param('id') id: string) {
        return this.executionService.get(id);
    }
}
