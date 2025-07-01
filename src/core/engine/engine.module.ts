import { Module } from '@nestjs/common';
import { RunnerService } from './runner.service';
import { NodeExecutor } from './node.executor';
import { QueueProcessor } from './queue.processor';

@Module({
  providers: [RunnerService, NodeExecutor, QueueProcessor],
  exports: [RunnerService],
})
export class EngineModule {}
