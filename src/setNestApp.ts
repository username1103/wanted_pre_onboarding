import { ClassSerializerInterceptor, INestApplication, VersioningType } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import helmet from 'helmet';

export function setNestApp(app: INestApplication) {
  app.use(helmet());

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableShutdownHooks();
}
