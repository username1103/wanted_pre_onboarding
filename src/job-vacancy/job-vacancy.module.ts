import { Module } from '@nestjs/common';
import { CompanyModule } from 'src/company/company.module';
import { JobVacancyController } from './job-vacancy.controller';
import { JobVacancyRepository } from './job-vacancy.repository';
import { JobVacancyService } from './job-vacancy.service';

@Module({
  imports: [CompanyModule],
  controllers: [JobVacancyController],
  providers: [JobVacancyRepository, JobVacancyService],
  exports: [JobVacancyRepository],
})
export class JobVacancyModule {}
