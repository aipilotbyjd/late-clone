import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowEntity } from './workflow.entity';
import { WorkflowVersionEntity } from './workflow_version.entity';
import { WorkflowService } from './workflow.service';
import { WorkflowController } from './workflow.controller';

@Module({
    imports: [TypeOrmModule.forFeature([WorkflowEntity, WorkflowVersionEntity])],
    providers: [WorkflowService],
    controllers: [WorkflowController],
    exports: [WorkflowService],
})
export class WorkflowsModule { }
