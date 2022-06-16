import { Injectable } from '@nestjs/common';
import { JobVacancyRepository } from './job-vacancy.repository';

@Injectable()
export class JobVacancyService {
  constructor(private readonly jobVacancyRepository: JobVacancyRepository) {}
}
