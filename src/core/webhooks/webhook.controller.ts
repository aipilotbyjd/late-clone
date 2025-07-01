import {
  Controller,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { WebhookService } from './webhook.service';

@Controller()
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  // Endpoint to receive external webhook calls
  @Post('webhooks/:id')
  @HttpCode(HttpStatus.OK)
  async receive(@Param('id') id: string, @Body() body: any) {
    const path = `/webhooks/${id}`;
    await this.webhookService.handleIncoming(path, body);
    // Respond immediately
    return { received: true };
  }
}
