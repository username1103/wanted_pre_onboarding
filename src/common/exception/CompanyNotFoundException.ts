import { NotFoundException } from '@nestjs/common';
import { ResponseStatus } from '../response/ResponseStatus';
import { ErrorInfo } from './ErrorInfo';

export class CompanyNotFoudnException extends NotFoundException {
  constructor(message = '해당하는 회사가 존재하지 않습니다') {
    super(new ErrorInfo(ResponseStatus.COMPANY_NOT_FOUND, message));
  }
}
