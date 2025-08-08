import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SESService {
  private readonly sesClient = new SESClient({ region: process.env.AWS_REGION });

  async sendMail(to: string, subject: string, html: string) {
    try {
      const response = await this.sesClient.send(
        new SendEmailCommand({
          Source: process.env.SENDER_EMAIL,
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
