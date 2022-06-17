import { Module } from '@nestjs/common';
import { JobApplicationController } from './job-application.controller';
import { JobApplicationRepository } from './job-application.repository';
import { JobApplicationService } from './job-application.service';

@Module({
  imports: [],
  controllers: [JobApplicationController],
  providers: [JobApplicationService, JobApplicationRepository],
  exports: [],
})
export class JobApplicationModule {}
