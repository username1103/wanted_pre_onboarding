import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Response } from 'express';
import { ApiNotFoundException } from '../exception/ApiNotFoundException';
import { ErrorInfo } from '../exception/ErrorInfo';
import { ResponseEntity } from '../response/ResponseEntity';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    exception = this.convert(exception);
    const responseEntity = this.getResponse(exception);
    const status = exception.getStatus();
    // TODO: morgan 연결위해 제작함
    response.locals.error = instanceToPlain(exception.getResponse());

    if (process.env.NODE_ENV === 'development') {
      this.logger.error(exception);
    }

    response.status(status).json(instanceToPlain(responseEntity));
  }

  convert(exception: Error) {
    if (!(exception instanceof HttpException)) {
      return new InternalServerErrorException();
    }

    // 해당하는 API가 존재하지 않는 경우
    if (exception.constructor.name === NotFoundException.name) {
      return new ApiNotFoundException();
    }

    const responseBody = exception.getResponse();

    // 사용자가 정의한 에러가 아닌 경우
    if (!(responseBody instanceof ErrorInfo)) {
      return new InternalServerErrorException();
    }

    // 공개하고 싶지 않은 에러인 경우
    if (responseBody.isHidden) {
      return new InternalServerErrorException();
    }

    return exception;
  }

  getResponse(exception: HttpException) {
    if (exception instanceof InternalServerErrorException) {
      return ResponseEntity.ERROR();
    }

    const response = exception.getResponse() as ErrorInfo<any>;

    return ResponseEntity.ERROR_WITH_DATA(response.message, response.errorCode, response.data);
  }
}
