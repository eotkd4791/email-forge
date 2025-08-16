import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QueueModule } from './queue/queue.module';
import { EmailModule } from './email/email.module';
import { MailSenderModule } from './mail-sender/mail-sender.module';
import { MetricsModule } from './metrics/metrics.module';
import { ConfigModule } from '@nestjs/config';
import { configSchema } from './config/config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: config => {
        const validatedConfig = configSchema.parse(config);
        return validatedConfig;
      },
    }),
    QueueModule,
    EmailModule,
    MailSenderModule,
    MetricsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
