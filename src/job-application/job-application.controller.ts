import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiErrorResponse } from '../common/decorator/api-error-response.decorator';
import { ExceededNumberOfApplicationException } from '../common/exception/ExceededNumberOfApplicationsException';
import { JobVacancyNotFoundException } from '../common/exception/JobVacancyNotFoundException';
import { UserNotFoudnException } from '../common/exception/UserNotFoundException';
import { ResponseEntity } from '../common/response/ResponseEntity';
import { ApiSuccessResponse } from '../common/decorator/api-success-response.decorator';
import { CreateJobApplication } from './dto/create-job-application';
import { JobApplicationId } from './dto/job-application-id';
import { JobApplicationService } from './job-application.service';

@Controller('/job-applications')
@ApiTags('JobApplication')
export class JobApplicationController {
  constructor(private readonly jobApplicationService: JobApplicationService) {}

  @Post()
  @ApiSuccessResponse(HttpStatus.CREATED, JobApplicationId)
  @ApiErrorResponse(
    new UserNotFoudnException(),
    new JobVacancyNotFoundException(),
    new ExceededNumberOfApplicationException(),
  )
  async create(@Body() body: CreateJobApplication) {
    const jobApplication = await this.jobApplicationService.create(body.userId, body.jobVacancyId);

    return ResponseEntity.OK_WITH_DATA(JobApplicationId.of(jobApplication));
  }
}
