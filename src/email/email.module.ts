import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { BullModule } from '@nestjs/bull';
import { EmailProcessor } from './email.processor';
import { QueueModule } from '../queue/queue.module';
import { MailSenderModule } from '../mail-sender/mail-sender.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [QueueModule, BullModule.registerQueue({ name: 'email' }), MailSenderModule, AuthModule],
  controllers: [EmailController],
  providers: [EmailService, EmailProcessor],
})
export class EmailModule {}
