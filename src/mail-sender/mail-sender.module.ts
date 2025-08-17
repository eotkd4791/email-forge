import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { type Config } from '@/config/config.schema';
import { AWSSESService } from '@/mail-sender/providers/aws-ses/aws-ses.service';
import { ResendService } from '@/mail-sender/providers/resend/resend.service';
import { SendGridService } from '@/mail-sender/providers/sendgrid/sendgrid.service';

@Module({
  providers: [
    AWSSESService,
    ResendService,
    SendGridService,
    {
      provide: 'MailSender',
      useFactory: (
        configService: ConfigService<Config>,
        awsSesService: AWSSESService,
        resendService: ResendService,
        sendGridService: SendGridService,
      ) => {
        const provider = configService.get('EMAIL_PROVIDER', { infer: true });
        switch (provider) {
          case 'AWS_SES':
            return awsSesService;
          case 'RESEND':
            return resendService;
          case 'SENDGRID':
            return sendGridService;
          default:
            return awsSesService;
        }
      },
      inject: [ConfigService, AWSSESService, ResendService, SendGridService],
    },
  ],
  exports: ['MailSender'],
})
export class MailSenderModule {}
