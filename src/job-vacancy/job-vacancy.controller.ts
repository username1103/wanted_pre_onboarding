import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
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
import { SearchJobVacancy } from './dto/serach-job-vacancy';
import { JobVacancyRepository } from './job-vacancy.repository';
import { SearchJobVacancyDto } from './dto/search-job-vacancy.dto';
import { ReadJobVacancy } from './dto/read-job-vacancy';

@Controller('/job-vacancies')
@ApiTags('JobVacancy')
export class JobVacancyController {
  constructor(
    private readonly jobVacancyService: JobVacancyService,
    private readonly jobVacancyRepository: JobVacancyRepository,
  ) {}

  @Post()
  @ApiSuccessResponse(HttpStatus.CREATED, JobVacancyId)
  @ApiErrorResponse(new CompanyNotFoudnException())
  async create(@Body() body: CreateJobVacancy) {
    const jobVacancy = await this.jobVacancyService.create(body);

    return ResponseEntity.OK_WITH_DATA(JobVacancyId.of(jobVacancy));
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

  @Get()
  @ApiSuccessResponse(HttpStatus.OK, [SearchJobVacancyDto])
  async search(@Query() query?: SearchJobVacancy) {
    const results = await this.jobVacancyRepository.serach(query);

    return ResponseEntity.OK_WITH_DATA(await Promise.all(results.map((result) => SearchJobVacancyDto.of(result))));
  }

  @Get('/:jobVacancyId')
  @ApiSuccessResponse(HttpStatus.OK, ReadJobVacancy)
  async get(@Param('jobVacancyId', ParseIntPipe) jobVacancyId: string) {
    const jobVacancy = await this.jobVacancyService.get(+jobVacancyId);

    return ResponseEntity.OK_WITH_DATA(jobVacancy);
  }
}
