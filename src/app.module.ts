import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QueueModule } from './queue/queue.module';
import { EmailModule } from './email/email.module';
import { MailSenderModule } from './mail-sender/mail-sender.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), QueueModule, EmailModule, MailSenderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
