import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebhookEntity } from './webhook.entity';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { ExecutionsModule } from '../../domains/executions/executions.module';

@Module({
  imports: [TypeOrmModule.forFeature([WebhookEntity]), ExecutionsModule],
  providers: [WebhookService],
  controllers: [WebhookController],
  exports: [WebhookService],
})
export class WebhooksModule {}
