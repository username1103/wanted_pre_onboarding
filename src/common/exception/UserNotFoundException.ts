import { NotFoundException } from '@nestjs/common';
import { ResponseStatus } from '../response/ResponseStatus';
import { ErrorInfo } from './ErrorInfo';

export class UserNotFoudnException extends NotFoundException {
  constructor(message = '해당하는 유저가 존재하지 않습니다') {
    super(new ErrorInfo(ResponseStatus.USER_NOT_FOUND, message));
  }
}
