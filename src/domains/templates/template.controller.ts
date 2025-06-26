import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TemplateService } from './template.service';

@Controller('templates')
export class TemplateController {
    constructor(private readonly templateService: TemplateService) { }

    @Post()
    async create(@Body() body: { name: string; description: string; definition: any }) {
        return this.templateService.create(body.name, body.description, body.definition);
    }

    @Get()
    async list() {
        return this.templateService.list();
    }

    @Get(':id')
    async get(@Param('id') id: string) {
        return this.templateService.get(id);
    }
}
