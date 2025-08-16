import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { type Config } from '../../../config/config.schema';
import { MailSender, MailSenderParams } from '../mail-sender.interface';
import { AWSSESError } from './AWSSESError';

@Injectable()
export class AWSSESService implements MailSender {
  private readonly client: SESClient;

  constructor(private readonly configService: ConfigService<Config>) {
    this.client = new SESClient({
      region: this.configService.get('AWS_REGION', { infer: true }),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID', { infer: true })!,
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY', { infer: true })!,
      },
    });
  }

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
      console.error('이메일 발송 실패:', error);
      if (error instanceof Error) {
        throw new AWSSESError(error.message);
      }
    }
  }
}
