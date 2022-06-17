import { Injectable } from '@nestjs/common';
import { JobVacancyNotFoundException } from '../common/exception/JobVacancyNotFoundException';
import { CompanyNotFoudnException } from '../common/exception/CompanyNotFoundException';
import { CompanyRepository } from '../company/company.respository';
import { CreateJobVacancy } from './dto/create-job-vacancy';
import { UpdateJobVacancy } from './dto/update-job-vacancy';
import { JobVacancyRepository } from './job-vacancy.repository';

@Injectable()
export class JobVacancyService {
  constructor(
    private readonly jobVacancyRepository: JobVacancyRepository,
    private readonly companyRepository: CompanyRepository,
  ) {}

  async create({ companyId, ...jobVacancyInfo }: CreateJobVacancy) {
    const company = await this.companyRepository.findById(companyId);
    if (!company) {
      throw new CompanyNotFoudnException();
    }

    const jobVacancy = company.createJobVacancy(jobVacancyInfo);

    await this.jobVacancyRepository.save(jobVacancy);

    return jobVacancy;
  }

  async update(jobVacancyId: number, updateInfo: UpdateJobVacancy) {
    const jobVacancy = await this.jobVacancyRepository.findById(jobVacancyId);
    if (!jobVacancy) {
      throw new JobVacancyNotFoundException();
    }

    jobVacancy.update(updateInfo);

    await this.jobVacancyRepository.save(jobVacancy);
  }

  async delete(jobVacancyId: number) {
    const jobVacancy = await this.jobVacancyRepository.findById(jobVacancyId);
    if (!jobVacancy) {
      throw new JobVacancyNotFoundException();
    }

    await this.jobVacancyRepository.delete({ id: jobVacancyId });
  }
}
