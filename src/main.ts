import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { ConfigService } from '@nestjs/config';
import { type Config } from '@/config/config.schema';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(Logger));

  const configService = app.get<ConfigService<Config>>(ConfigService);
  const port = configService.get('PORT', { infer: true }) as number;
  await app.listen(port);
}
bootstrap().catch(error => console.error(error));
