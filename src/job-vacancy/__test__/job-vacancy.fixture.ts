import { faker } from '@faker-js/faker/locale/ko';
import { Company } from '../../company/company.entity';
import { JobVacancy } from '../job-vacancy.entity';

export const getJobVacancy = (id?: number, company?: Company) => {
  const jobVacancy = new JobVacancy();
  jobVacancy.id = id || faker.datatype.number({ min: 1 });
  jobVacancy.content = faker.datatype.string();
  jobVacancy.company = company;
  jobVacancy.employmentCompensation = faker.datatype.number();
  jobVacancy.jobPosition = faker.commerce.department();
  jobVacancy.technology = faker.datatype.string();
  jobVacancy.createdAt = new Date();
  jobVacancy.updatedAt = new Date();
  return jobVacancy;
};
