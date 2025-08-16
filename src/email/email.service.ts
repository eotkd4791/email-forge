import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bullmq';
import { SendDiscountEventDto } from './dto/send-discount-event.dto';
import { SendEmailVerificationDto } from './dto/send-email-verification.dto';
import { SendIdentityVerificationExpiredDto } from './dto/send-identity-verification-expired.dto';
import { SendPrivacyPolicyUpdateDto } from './dto/send-privacy-policy-update.dto';

@Injectable()
export class EmailService {
  constructor(@InjectQueue('email') private emailQueue: Queue) {}

  async enqueueDiscountEventEmails({ users, subject, eventLink }: SendDiscountEventDto) {
    const jobs = users.map(({ email, name }) => ({
      name: 'sendDiscountEvent',
      data: { to: email, name, subject, eventLink },
    }));
    await this.emailQueue.addBulk(jobs);
  }

  async enqueueEmailVerification({ email, name, subject, verificationLink }: SendEmailVerificationDto) {
    await this.emailQueue.add('sendEmailVerification', { to: email, name, subject, verificationLink }, { priority: 1 });
  }

  async enqueueIdentityVerificationExpired({
    email,
    name,
    subject,
    verificationLink,
  }: SendIdentityVerificationExpiredDto) {
    await this.emailQueue.add(
      'sendIdentityVerificationExpired',
      { to: email, name, subject, verificationLink },
      { priority: 1 },
    );
  }

  async enqueuePrivacyPolicyUpdateEmails({ users, subject, policyLink }: SendPrivacyPolicyUpdateDto) {
    const jobs = users.map(({ email, name }) => ({
      name: 'sendPrivacyPolicyUpdate',
      data: { to: email, name, subject, policyLink },
    }));
    await this.emailQueue.addBulk(jobs);
  }
}
