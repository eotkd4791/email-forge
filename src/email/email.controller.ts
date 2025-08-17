import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendDiscountEventDto } from './dto/send-discount-event.dto';
import { SendEmailVerificationDto } from './dto/send-email-verification.dto';
import { SendIdentityVerificationExpiredDto } from './dto/send-identity-verification-expired.dto';
import { SendPrivacyPolicyUpdateDto } from './dto/send-privacy-policy-update.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@UsePipes(new ValidationPipe())
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @HttpCode(HttpStatus.ACCEPTED)
  @Post('email-verification')
  async sendEmailVerification(@Body() dto: SendEmailVerificationDto) {
    await this.emailService.enqueueEmailVerification(dto);
    return { success: true, message: '인증 이메일이 성공적으로 대기열에 추가되었습니다.' };
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Post('identity-verification-expired')
  async sendIdentityVerificationExpired(@Body() dto: SendIdentityVerificationExpiredDto) {
    await this.emailService.enqueueIdentityVerificationExpired(dto);
    return { success: true, message: '신원 인증 만료 안내 이메일이 성공적으로 대기열에 추가되었습니다.' };
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Post('discount-event')
  async sendDiscountEvent(@Body() dto: SendDiscountEventDto) {
    await this.emailService.enqueueDiscountEventEmails(dto);
    return { success: true, message: '할인 이벤트 이메일이 성공적으로 대기열에 추가되었습니다.' };
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Post('privacy-policy-update')
  async sendPrivacyPolicyUpdate(@Body() dto: SendPrivacyPolicyUpdateDto) {
    await this.emailService.enqueuePrivacyPolicyUpdateEmails(dto);
    return { success: true, message: '개인정보 처리방침 변경 안내 이메일이 성공적으로 대기열에 추가되었습니다.' };
  }
}
