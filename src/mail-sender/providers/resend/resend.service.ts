import { Injectable, Logger } from '@nestjs/common';
import { Resend } from 'resend';
import { MailSender, MailSenderParams } from '../mail-sender.interface';
import { ResendError } from './ResendError';

@Injectable()
export class ResendService implements MailSender {
  private readonly resend = new Resend(process.env.RESEND_API_KEY);
  private readonly logger = new Logger(ResendService.name);

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
