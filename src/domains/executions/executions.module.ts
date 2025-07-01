import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExecutionEntity } from './execution.entity';
import { ExecutionLogEntity } from './execution_log.entity';
import { ExecutionService } from './execution.service';
import { ExecutionController } from './execution.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ExecutionEntity, ExecutionLogEntity])],
  providers: [ExecutionService],
  controllers: [ExecutionController],
  exports: [ExecutionService],
})
export class ExecutionsModule {}
