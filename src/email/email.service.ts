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

  async enqueueDiscountEventEmails(dto: SendDiscountEventDto) {
    const jobs = dto.users.map(user => ({
      name: 'sendDiscountEvent',
      data: {
        to: user.email,
        name: user.name,
        subject: dto.subject,
        eventLink: dto.eventLink,
      },
    }));
    await this.emailQueue.addBulk(jobs);
  }

  async enqueueEmailVerification(dto: SendEmailVerificationDto) {
    await this.emailQueue.add('sendEmailVerification', {
      to: dto.email,
      name: dto.name,
      subject: dto.subject,
      verificationLink: dto.verificationLink,
    });
  }

  async enqueueIdentityVerificationExpired(dto: SendIdentityVerificationExpiredDto) {
    await this.emailQueue.add('sendIdentityVerificationExpired', {
      to: dto.email,
      name: dto.name,
      subject: dto.subject,
      verificationLink: dto.verificationLink,
    });
  }

  async enqueuePrivacyPolicyUpdateEmails(dto: SendPrivacyPolicyUpdateDto) {
    const jobs = dto.users.map(user => ({
      name: 'sendPrivacyPolicyUpdate',
      data: {
        to: user.email,
        name: user.name,
        subject: dto.subject,
        policyLink: dto.policyLink,
      },
    }));
    await this.emailQueue.addBulk(jobs);
  }
}
