import { ClassSerializerInterceptor, INestApplication, Logger, VersioningType } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import helmet from 'helmet';
import { AllExceptionFilter } from './common/filter/AllExceptionFillter';

export function setNestApp(app: INestApplication) {
  app.use(helmet());

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalFilters(new AllExceptionFilter(app.get(Logger)));

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableShutdownHooks();
}
