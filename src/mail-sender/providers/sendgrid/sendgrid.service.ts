import { Injectable, Logger } from '@nestjs/common';
import { MailSender, MailSenderParams } from '../mail-sender.interface';
import SendGrid from '@sendgrid/mail';

@Injectable()
export class SendGridService implements MailSender {
  constructor(private readonly logger: Logger) {
    this.logger = new Logger(SendGridService.name);
    SendGrid.setApiKey(process.env.SENDGRID_API_KEY!);
  }

  async sendEmail({ to, subject, html, sender }: MailSenderParams) {
    try {
      const response = await SendGrid.send({
        to,
        subject,
        html,
        from: sender,
      });
      return response;
    } catch (error) {
      this.logger.error('Failed to send email:', error);
      throw error;
    }
  }
}
