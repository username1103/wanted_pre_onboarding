import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { AppConfigService } from './common/config/app/config.service';
import { getLogger } from './common/logger/getLogger';
import { setNestApp } from './setNestApp';
import { setSwagger } from './setSwagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: WinstonModule.createLogger(getLogger('APP')),
  });

  setNestApp(app);

  setSwagger(app);

  const appConfigService = app.get(AppConfigService);

  await app.listen(appConfigService.port);
}

bootstrap();
