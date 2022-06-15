import { ClassSerializerInterceptor, INestApplication, Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import helmet from 'helmet';
import { BadParameterException } from './common/exception/BadParameterException';
import { AllExceptionFilter } from './common/filter/AllExceptionFillter';

export function setNestApp(app: INestApplication) {
  app.use(helmet());

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalFilters(new AllExceptionFilter(app.get(Logger)));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadParameterException(
          `Invalid value, property: ${validationErrors[0].property}, value: ${validationErrors[0].value}`,
        );
      },
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableShutdownHooks();
}
