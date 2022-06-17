import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfigService } from './common/config/app/config.service';
import { ResponseEntity } from './common/response/ResponseEntity';
import { JobVacancyModule } from './job-vacancy/job-vacancy.module';

export const setSwagger = (app: INestApplication) => {
  const appConfigService = app.get(AppConfigService);

  const config = new DocumentBuilder()
    .setTitle('Wanted-Pre-Onboarding REST API')
    .setVersion('1.0.0')
    .addServer(`http://localhost:${appConfigService.port}`)
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [JobVacancyModule],
    extraModels: [ResponseEntity],
  });

  SwaggerModule.setup('/v1/docs', app, document, {
    swaggerOptions: {
      operationsSorter: (a: any, b: any) => {
        const methodsOrder = ['post', 'put', 'patch', 'get', 'delete', 'options', 'trace'];
        let result = methodsOrder.indexOf(a.get('method')) - methodsOrder.indexOf(b.get('method'));

        if (result === 0) {
          result = a.get('path').localeCompare(b.get('path'));
        }

        return result;
      },
    },
  });
};
