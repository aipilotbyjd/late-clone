import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HookService } from './hook.service';
import { EmailService } from './email.service';

import { NotificationHook } from './notification-hook.entity';
import { WebhooksModule } from '../../core/webhooks/webhooks.module';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationHook]), WebhooksModule],
  providers: [HookService, EmailService],
  exports: [HookService],
})
export class NotificationsModule {}
