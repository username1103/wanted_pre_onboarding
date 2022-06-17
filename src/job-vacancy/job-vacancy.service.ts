import { Injectable } from '@nestjs/common';
import { CompanyNotFoudnException } from '../common/exception/CompanyNotFoundException';
import { CompanyRepository } from '../company/company.respository';
import { CreateJobVacancy } from './dto/create-job-vacancy';
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
}
