import { applyDecorators, HttpException } from '@nestjs/common';
import { ApiResponse, ApiResponseOptions, getSchemaPath } from '@nestjs/swagger';
import { instanceToPlain } from 'class-transformer';
import { ResponseEntity } from '../response/ResponseEntity';

export function ApiErrorResponse(...errors: HttpException[]) {
  const apiResponses = {};

  errors.forEach((error) => {
    const status = error.getStatus();
    const response: any = error.getResponse();
    if (!apiResponses[status]) {
      apiResponses[status] = {
        status,
        content: {
          'application/json': {
            schema: { $ref: getSchemaPath(ResponseEntity) },
            examples: {
              [response.errorCode]: {
                description: response.message,
                value: instanceToPlain(ResponseEntity.ERROR_WITH_DATA(response.message, response.errorCode, response.data)),
              },
            },
          },
        },
      };
    } else {
      apiResponses[status].content.examples[response.errorCode] = {
        description: response.message,
        value: instanceToPlain(ResponseEntity.ERROR_WITH_DATA(response.message, response.errorCode, response.data)),
      };
    }
  });

  return applyDecorators(
    ...Object.values(apiResponses).map((value: ApiResponseOptions) => {
      return ApiResponse({ ...value });
    }),
  );
}
