import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QueueModule } from './queue/queue.module';
import { EmailModule } from './email/email.module';
import { MailSenderModule } from './mail-sender/mail-sender.module';
import { MetricsModule } from './metrics/metrics.module';
import { configSchema } from './config/config.schema';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: config => configSchema.parse(config),
    }),
    AuthModule,
    QueueModule,
    EmailModule,
    MailSenderModule,
    MetricsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
