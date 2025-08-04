import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [BullModule.registerQueue({ name: 'email' })],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
