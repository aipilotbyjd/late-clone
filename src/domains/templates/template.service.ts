import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TemplateEntity } from './template.entity';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(TemplateEntity)
    private readonly templateRepo: Repository<TemplateEntity>,
  ) {}

  async create(name: string, description: string, definition: any) {
    return this.templateRepo.save({ name, description, definition });
  }

  async list() {
    return this.templateRepo.find({ order: { createdAt: 'DESC' } });
  }

  async get(id: string) {
    return this.templateRepo.findOne({ where: { id } });
  }
}
