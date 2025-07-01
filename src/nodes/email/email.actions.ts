import { NodeAction, NodeContext } from '../../interfaces/node.interface';
import * as nodemailer from 'nodemailer';

export const EmailActions: Record<string, NodeAction> = {
  sendEmail: {
    name: 'Send Email',
    description: 'Send an email via SMTP',
    async run(ctx: NodeContext): Promise<any> {
      const { host, port, secure, user, password } = ctx.credentials.email;
      const { from, to, cc, bcc, subject, text, html, attachments } = ctx.params;

      const transporter = nodemailer.createTransporter({
        host,
        port,
        secure,
        auth: {
          user,
          pass: password,
        },
      });

      const mailOptions = {
        from: from || user,
        to,
        cc,
        bcc,
        subject,
        text,
        html,
        attachments,
      };

      const result = await transporter.sendMail(mailOptions);
      return {
        messageId: result.messageId,
        response: result.response,
        accepted: result.accepted,
        rejected: result.rejected,
      };
    },
  },

  sendBulkEmail: {
    name: 'Send Bulk Email',
    description: 'Send emails to multiple recipients',
    async run(ctx: NodeContext): Promise<any> {
      const { host, port, secure, user, password } = ctx.credentials.email;
      const { from, recipients, subject, text, html } = ctx.params;

      const transporter = nodemailer.createTransporter({
        host,
        port,
        secure,
        auth: {
          user,
          pass: password,
        },
      });

      const results: any[] = [];
      for (const recipient of recipients) {
        const mailOptions = {
          from: from || user,
          to: recipient.email,
          subject: subject.replace(/{{name}}/g, recipient.name || ''),
          text: text?.replace(/{{name}}/g, recipient.name || ''),
          html: html?.replace(/{{name}}/g, recipient.name || ''),
        };

        try {
          const result = await transporter.sendMail(mailOptions);
          results.push({
            email: recipient.email,
            success: true,
            messageId: result.messageId,
          });
        } catch (error) {
          results.push({
            email: recipient.email,
            success: false,
            error: error.message,
          });
        }
      }

      return { results };
    },
  },
};
