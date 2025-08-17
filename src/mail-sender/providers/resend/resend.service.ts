import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { type Config } from '@/config/config.schema';
import { MailSender, MailSenderParams } from '@/mail-sender/providers/mail-sender.interface';
import { ResendError } from './ResendError';

@Injectable()
export class ResendService implements MailSender {
  private readonly resend: Resend;
  private readonly logger = new Logger(ResendService.name);

  constructor(private readonly configService: ConfigService<Config>) {
    this.resend = new Resend(this.configService.get('RESEND_API_KEY', { infer: true }));
  }

  async sendEmail({ to, subject, html, sender }: MailSenderParams) {
    try {
      const { data, error } = await this.resend.emails.send({
        from: sender,
        to,
        subject,
        html,
      });

      if (error) {
        throw new ResendError(`${error.name}: ${error.message}`);
      }

      return data;
    } catch (error) {
      if (error instanceof ResendError) {
        this.logger.error(error);
      }
      throw error;
    }
  }
}
