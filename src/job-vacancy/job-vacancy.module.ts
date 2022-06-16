import { Module } from '@nestjs/common';
import { JobVacancyController } from './job-vacancy.controller';
import { JobVacancyRepository } from './job-vacancy.repository';
import { JobVacancyService } from './job-vacancy.service';

@Module({
  imports: [],
  controllers: [JobVacancyController],
  providers: [JobVacancyRepository, JobVacancyService],
  exports: [],
})
export class JobVacancyModule {}
