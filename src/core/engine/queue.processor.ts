import { Injectable, Logger } from '@nestjs/common';
import { RunnerService } from './runner.service';

@Injectable()
export class QueueProcessor {
  private readonly logger = new Logger(QueueProcessor.name);

  constructor(private readonly runner: RunnerService) {}

  async process(job: any) {
    const { workflow, input } = job.data;
    try {
      this.logger.log(`Processing job: ${job.id}`);
      const result = await this.runner.run(workflow, input);
      return result;
    } catch (err) {
      this.logger.error(`Failed job ${job.id}`, err.stack);
      throw err;
    }
  }
}
