import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private readonly logger = new Logger(EmailService.name);
    private readonly transporter: nodemailer.Transporter;

    constructor() {
        // Configure as needed or inject via ConfigService
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_SECURE,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }

    async send(opts: { to: string; subject: string; text: string; html?: string }) {
        const info = await this.transporter.sendMail({
            from: process.env.SMTP_FROM,
            to: opts.to,
            subject: opts.subject,
            text: opts.text,
            html: opts.html,
        });
        this.logger.log(`Email sent: ${info.messageId}`);
        return info;
    }
}
