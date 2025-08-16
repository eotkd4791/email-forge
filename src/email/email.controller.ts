import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendDiscountEventDto } from './dto/send-discount-event.dto';
import { SendEmailVerificationDto } from './dto/send-email-verification.dto';
import { SendIdentityVerificationExpiredDto } from './dto/send-identity-verification-expired.dto';
import { SendPrivacyPolicyUpdateDto } from './dto/send-privacy-policy-update.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @HttpCode(HttpStatus.ACCEPTED)
  @Post('discount-event')
  async sendDiscountEvent(@Body() dto: SendDiscountEventDto) {
    await this.emailService.enqueueDiscountEventEmails(dto);
    return { success: true, message: 'Discount event emails have been queued.' };
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Post('email-verification')
  async sendEmailVerification(@Body() dto: SendEmailVerificationDto) {
    await this.emailService.enqueueEmailVerification(dto);
    return { success: true, message: 'Verification email has been queued.' };
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Post('identity-verification-expired')
  async sendIdentityVerificationExpired(@Body() dto: SendIdentityVerificationExpiredDto) {
    await this.emailService.enqueueIdentityVerificationExpired(dto);
    return { success: true, message: 'Identity verification expired email has been queued.' };
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Post('privacy-policy-update')
  async sendPrivacyPolicyUpdate(@Body() dto: SendPrivacyPolicyUpdateDto) {
    await this.emailService.enqueuePrivacyPolicyUpdateEmails(dto);
    return { success: true, message: 'Privacy policy update emails have been queued.' };
  }
}
