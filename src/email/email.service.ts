import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bullmq';

@Injectable()
export class EmailService {
  constructor(@InjectQueue('email') private emailQueue: Queue) {}

  async enqueueWelcomeEmail(to: string, name: string) {
    await this.emailQueue.add('sendWelcome', { to, name });
  }
}
