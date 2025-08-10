import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bullmq';
import { renderEmail } from '../libs/email-renderer';
import WelcomeEmail from '../templates/WelcomeEmail';
import { type MailSender } from '../mail-sender/providers/mail-sender.interface';
import { Inject } from '@nestjs/common';

@Processor('email')
export class EmailProcessor {
  constructor(@Inject('MailSender') private readonly mailSender: MailSender) {}

  @Process('sendWelcome')
  async handleWelcomeEmail(job: Job<{ to: string; name: string; subject: string }>) {
    const { to, name, subject } = job.data;
    const html = await renderEmail({ template: WelcomeEmail, props: { name } });

    await this.mailSender.sendEmail({
      to,
      subject,
      html,
      sender: process.env.SENDER_EMAIL!,
    });
  }
}
