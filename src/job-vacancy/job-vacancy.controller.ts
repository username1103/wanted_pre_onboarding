import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiErrorResponse } from '../common/decorator/api-error-response.decorator';
import { ApiSuccessResponse } from '../common/decorator/api-success-response.decorator';
import { CompanyNotFoudnException } from '../common/exception/CompanyNotFoundException';
import { ResponseEntity } from '../common/response/ResponseEntity';
import { CreateJobVacancy } from './dto/create-job-vacancy';
import { JobVacancyId } from './dto/job-vacacncy-id';
import { JobVacancyService } from './job-vacancy.service';

@Controller('/job-vacancy')
@ApiTags('JobVacancy')
export class JobVacancyController {
  constructor(private readonly jobVacancyService: JobVacancyService) {}

  @Post()
  @ApiSuccessResponse(HttpStatus.CREATED, JobVacancyId)
  @ApiErrorResponse(new CompanyNotFoudnException())
  async create(@Body() body: CreateJobVacancy) {
    const jobVacancy = await this.jobVacancyService.create(body);

    return ResponseEntity.OK_WITH_DATA({ job_vacancy_id: jobVacancy.id });
  }
}
