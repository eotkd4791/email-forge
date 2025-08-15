import { Module } from '@nestjs/common';
import { AWSSESService } from './providers/aws-ses/aws-ses.service';
import { ResendService } from './providers/resend/resend.service';

@Module({
  providers: [
    AWSSESService,
    ResendService,
    {
      provide: 'MailSender',
      useFactory: (awsSesService: AWSSESService, resendService: ResendService) => {
        switch (process.env.EMAIL_PROVIDER) {
          case 'AWS_SES':
            return awsSesService;
          case 'RESEND':
            return resendService;
          default:
            return awsSesService;
        }
      },
      inject: [AWSSESService, ResendService],
    },
  ],
  exports: ['MailSender'],
})
export class MailSenderModule {}
