import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bullmq';
import { SESService } from '../ses/ses.service';
import { renderEmail } from '../libs/email-renderer';
import WelcomeEmail from '../templates/WelcomeEmail';

@Processor('email')
export class EmailProcessor {
  constructor(private readonly sesService: SESService) {}

  @Process('sendWelcome')
  async handleWelcomeEmail(job: Job<{ to: string; name: string }>) {
    const { to, name } = job.data;
    const html = await renderEmail({ template: WelcomeEmail, props: { name } });

    await this.sesService.sendMail(to, '환영합니다!', html);
  }
}
