import { Injectable } from '@nestjs/common';
import { JobApplicationRepository } from './job-application.repository';

@Injectable()
export class JobApplicationService {
  constructor(private readonly jobApplicationRepository: JobApplicationRepository) {}
}
