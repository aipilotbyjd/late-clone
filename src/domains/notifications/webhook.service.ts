import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';

@Injectable()
export class WebhookService {
    private readonly logger = new Logger(WebhookService.name);

    async post(url: string, body: any, config?: AxiosRequestConfig) {
        try {
            const res = await axios.post(url, body, config);
            this.logger.log(`Webhook POST to ${url} status ${res.status}`);
            return res.data;
        } catch (err) {
            this.logger.error(`Webhook POST failed: ${url}`, err.stack);
            throw err;
        }
    }
}
