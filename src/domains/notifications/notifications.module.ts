import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HookService } from './hook.service';
import { EmailService } from './email.service';
import { WebhookService } from './webhook.service';
import { NotificationHook } from './notification-hook.entity';

@Module({
    imports: [TypeOrmModule.forFeature([NotificationHook])],
    providers: [HookService, EmailService, WebhookService],
    exports: [HookService],
})
export class NotificationsModule { }
