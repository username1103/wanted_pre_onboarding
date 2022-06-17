import { BadRequestException } from '@nestjs/common';
import { ResponseStatus } from '../response/ResponseStatus';
import { ErrorInfo } from './ErrorInfo';

export class ExceededNumberOfApplicationException extends BadRequestException {
  constructor(message = '신청가능한 횟수를 초과했습니다') {
    super(new ErrorInfo(ResponseStatus.EXCEEDED_NUMBER_OF_APPLICATIONS, message));
  }
}
