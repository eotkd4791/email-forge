import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';
import { Injectable } from '@nestjs/common';
import { MailSender, MailSenderParams } from '../mail-sender.interface';

@Injectable()
export class AWSSESService implements MailSender {
  private readonly client = new SESClient({ region: process.env.AWS_REGION });

  async sendEmail({ to, subject, html, sender }: MailSenderParams) {
    try {
      const response = await this.client.send(
        new SendEmailCommand({
          Source: sender,
          Destination: {
            ToAddresses: [to],
          },
          Message: {
            Subject: {
              Charset: 'UTF-8',
              Data: subject,
            },
            Body: {
              Html: {
                Charset: 'UTF-8',
                Data: html,
              },
            },
          },
        }),
      );
      return response;
    } catch (error) {
      console.error('Failed to send email:', error);
      throw error;
    }
  }
}
