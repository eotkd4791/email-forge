import { Module } from '@nestjs/common';
import { AWSSESService } from './providers/aws-ses/aws-ses.service';
import { ResendService } from './providers/resend/resend.service';
import { SendGridService } from './providers/sendgrid/sendgrid.service';

@Module({
  providers: [
    AWSSESService,
    ResendService,
    SendGridService,
    {
      provide: 'MailSender',
      useFactory: (awsSesService: AWSSESService, resendService: ResendService, sendGridService: SendGridService) => {
        switch (process.env.EMAIL_PROVIDER) {
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
      inject: [AWSSESService, ResendService, SendGridService],
    },
  ],
  exports: ['MailSender'],
})
export class MailSenderModule {}
