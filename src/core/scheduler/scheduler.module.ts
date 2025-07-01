import { Module } from '@nestjs/common';
import { ScheduleModule as NestScheduleModule } from '@nestjs/schedule';
import { TriggerJobsService } from './trigger.jobs';
import { WorkflowsModule } from '../../domains/workflows/workflows.module';
import { ExecutionsModule } from '../../domains/executions/executions.module';

@Module({
  imports: [
    NestScheduleModule.forRoot(),
    WorkflowsModule,
    ExecutionsModule,
  ],
  providers: [TriggerJobsService],
  exports: [TriggerJobsService],
})
export class SchedulerModule { }