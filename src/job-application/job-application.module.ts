import { Module } from '@nestjs/common';
import { JobVacancyModule } from 'src/job-vacancy/job-vacancy.module';
import { UserModule } from 'src/user/user.module';
import { JobApplicationController } from './job-application.controller';
import { JobApplicationRepository } from './job-application.repository';
import { JobApplicationService } from './job-application.service';

@Module({
  imports: [JobVacancyModule, UserModule],
  controllers: [JobApplicationController],
  providers: [JobApplicationService, JobApplicationRepository],
  exports: [],
})
export class JobApplicationModule {}
