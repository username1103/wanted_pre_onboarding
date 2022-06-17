import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JobApplicationService } from './job-application.service';

@Controller('/job-application')
@ApiTags('JobApplication')
export class JobApplicationController {
  constructor(private readonly jobApplicationService: JobApplicationService) {}
}
