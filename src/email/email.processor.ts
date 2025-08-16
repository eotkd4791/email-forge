import { Processor, Process } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Job } from 'bullmq';
import { type Config } from '../config/config.schema';
import { renderEmail } from '../libs/email-renderer';
import { type MailSender } from '../mail-sender/providers/mail-sender.interface';
import WelcomeEmail from '../templates/WelcomeEmail';
import DiscountEvent from '../templates/DiscountEvent';
import EmailVerification from '../templates/EmailVerification';
import IdentityVerificationExpired from '../templates/IdentityVerificationExpired';
import PrivacyPolicyUpdate from '../templates/PrivacyPolicyUpdate';

@Processor('email')
export class EmailProcessor {
  private readonly senderEmail: string;

  constructor(
    @Inject('MailSender') private readonly mailSender: MailSender,
    private readonly configService: ConfigService<Config>,
  ) {
    this.senderEmail = this.configService.get('SENDER_EMAIL', { infer: true }) as string;
  }

  @Process('sendWelcome')
  async handleWelcomeEmail(job: Job<{ to: string; name: string; subject: string }>) {
    const { to, name, subject } = job.data;
    const html = await renderEmail({ template: WelcomeEmail, props: { name } });

    await this.mailSender.sendEmail({
      to,
      subject,
      html,
      sender: this.senderEmail,
    });
  }

  @Process('sendDiscountEvent')
  async handleDiscountEventEmail(job: Job<{ to: string; name: string; subject: string; eventLink: string }>) {
    const { to, name, subject, eventLink } = job.data;
    const html = await renderEmail({ template: DiscountEvent, props: { name, eventLink } });

    await this.mailSender.sendEmail({
      to,
      subject,
      html,
      sender: this.senderEmail,
    });
  }

  @Process('sendEmailVerification')
  async handleEmailVerification(job: Job<{ to: string; name: string; subject: string; verificationLink: string }>) {
    const { to, name, subject, verificationLink } = job.data;
    const html = await renderEmail({
      template: EmailVerification,
      props: { name, verificationLink },
    });

    await this.mailSender.sendEmail({
      to,
      subject,
      html,
      sender: this.senderEmail,
    });
  }

  @Process('sendIdentityVerificationExpired')
  async handleIdentityVerificationExpired(
    job: Job<{ to: string; name: string; subject: string; verificationLink: string }>,
  ) {
    const { to, name, subject, verificationLink } = job.data;
    const html = await renderEmail({
      template: IdentityVerificationExpired,
      props: { name, verificationLink },
    });

    await this.mailSender.sendEmail({
      to,
      subject,
      html,
      sender: this.senderEmail,
    });
  }

  @Process('sendPrivacyPolicyUpdate')
  async handlePrivacyPolicyUpdate(job: Job<{ to: string; name: string; subject: string; policyLink: string }>) {
    const { to, name, subject, policyLink } = job.data;
    const html = await renderEmail({
      template: PrivacyPolicyUpdate,
      props: { name, policyLink },
    });

    await this.mailSender.sendEmail({
      to,
      subject,
      html,
      sender: this.senderEmail,
    });
  }
}
