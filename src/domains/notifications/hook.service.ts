import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationHook } from './notification-hook.entity';
import { EmailService } from './email.service';
import { WebhookService } from './webhook.service';

@Injectable()
export class HookService {
  private readonly logger = new Logger(HookService.name);

  constructor(
    @InjectRepository(NotificationHook)
    private readonly hookRepo: Repository<NotificationHook>,
    private readonly emailService: EmailService,
    private readonly webhookService: WebhookService,
  ) {}

  async trigger(workflowId: string, event: string, payload: any) {
    const hooks = await this.hookRepo.find({
      where: { workflowId, active: true },
    });
    for (const hook of hooks) {
      try {
        if (hook.type === 'email') {
          await this.emailService.send({
            to: hook.config.to,
            subject: `Workflow ${workflowId} event: ${event}`,
            text: JSON.stringify(payload, null, 2),
          });
        } else if (hook.type === 'webhook') {
          await this.webhookService.post(hook.config.url, { event, payload });
        }
      } catch (err) {
        this.logger.error(`Failed to trigger hook ${hook.id}`, err.stack);
      }
    }
  }

  async create(hook: Partial<NotificationHook>) {
    return this.hookRepo.save(hook);
  }

  async list(workflowId: string) {
    return this.hookRepo.find({ where: { workflowId } });
  }
}
