import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { BullModule } from '@nestjs/bull';
import { SESService } from 'src/ses/ses.service';
import { EmailProcessor } from './email.processor';
import { QueueModule } from 'src/queue/queue.module';

@Module({
  imports: [QueueModule, BullModule.registerQueue({ name: 'email' })],
  controllers: [EmailController],
  providers: [EmailService, EmailProcessor, SESService],
})
export class EmailModule {}
