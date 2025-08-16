import { Injectable, Logger } from '@nestjs/common';
import { MailSender, MailSenderParams } from '../mail-sender.interface';
import SendGrid from '@sendgrid/mail';
import { ConfigService } from '@nestjs/config';
import { type Config } from '../../../config/config.schema';

@Injectable()
export class SendGridService implements MailSender {
  private readonly logger: Logger = new Logger(SendGridService.name);

  constructor(private readonly configService: ConfigService<Config>) {
    SendGrid.setApiKey(this.configService.get('SENDGRID_API_KEY', { infer: true })!);
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
