import { NotFoundException } from '@nestjs/common';
import { ResponseStatus } from '../response/ResponseStatus';
import { ErrorInfo } from './ErrorInfo';

export class JobVacancyNotFoundException extends NotFoundException {
  constructor(message = '해당하는 채용공고가 존재하지 않습니다') {
    super(new ErrorInfo(ResponseStatus.JOB_VACANCY_NOT_FOUND, message));
  }
}
