import { Body, Controller, Delete, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JobVacancyNotFoundException } from '../common/exception/JobVacancyNotFoundException';
import { ApiErrorResponse } from '../common/decorator/api-error-response.decorator';
import { ApiSuccessResponse } from '../common/decorator/api-success-response.decorator';
import { CompanyNotFoudnException } from '../common/exception/CompanyNotFoundException';
import { ResponseEntity } from '../common/response/ResponseEntity';
import { CreateJobVacancy } from './dto/create-job-vacancy';
import { JobVacancyId } from './dto/job-vacacncy-id';
import { JobVacancyService } from './job-vacancy.service';
import { UpdateJobVacancy } from './dto/update-job-vacancy';

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

  @Put('/:jobVacancyId')
  @ApiSuccessResponse(HttpStatus.NO_CONTENT)
  @ApiErrorResponse(new JobVacancyNotFoundException())
  async update(@Param('jobVacancyId', ParseIntPipe) jobVacancyId: string, @Body() body: UpdateJobVacancy) {
    await this.jobVacancyService.update(+jobVacancyId, body);
  }

  @Delete('/:jobVacancyId')
  @ApiSuccessResponse(HttpStatus.NO_CONTENT)
  @ApiErrorResponse(new JobVacancyNotFoundException())
  async delete(@Param('jobVacancyId', ParseIntPipe) JobVacancyId: string) {
    await this.jobVacancyService.delete(+JobVacancyId);
  }
}
