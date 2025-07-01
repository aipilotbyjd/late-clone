import { Module } from '@nestjs/common';
import { ScheduleModule as NestScheduleModule } from '@nestjs/schedule';
import { TriggerJobsService } from './trigger.jobs';

@Module({
  imports: [
    // Enables @Cron, @Interval, etc.
    NestScheduleModule.forRoot(),
  ],
  providers: [TriggerJobsService],
  exports: [TriggerJobsService],
})
export class SchedulerModule {}
