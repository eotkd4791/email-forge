import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SESService {
  private readonly sesClient = new SESClient({ region: process.env.AWS_REGION });

  async sendMail(to: string, subject: string, html: string) {
    await this.sesClient.send(
      new SendEmailCommand({
        Source: process.env.AWS_SES_SOURCE_EMAIL,
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
  }
}
