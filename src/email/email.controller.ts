import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @HttpCode(HttpStatus.ACCEPTED)
  @Post('send')
  async sendEmail(@Body() { to, name, subject }: { to: string; name: string; subject: string }) {
    await this.emailService.enqueueWelcomeEmail(to, name, subject);
    return { success: true };
  }
}
