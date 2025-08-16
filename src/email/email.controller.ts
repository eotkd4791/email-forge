import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendDiscountEventDto } from './dto/send-discount-event.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @HttpCode(HttpStatus.ACCEPTED)
  @Post('welcome')
  async sendWelcomeEmail(@Body() { to, name, subject }: { to: string; name: string; subject: string }) {
    await this.emailService.enqueueWelcomeEmail(to, name, subject);
    return { success: true, message: 'Welcome email has been queued.' };
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Post('discount-event')
  async sendDiscountEvent(@Body() body: SendDiscountEventDto) {
    await this.emailService.enqueueDiscountEventEmails(body);
    return { success: true, message: 'Discount event emails have been queued.' };
  }
}
