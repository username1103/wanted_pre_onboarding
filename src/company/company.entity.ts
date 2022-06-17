import { BaseEntity } from '../common/BaseEntity';
import { Column, Entity } from 'typeorm';
import { JobVacancy } from '../job-vacancy/job-vacancy.entity';

@Entity({ name: 'company' })
export class Company extends BaseEntity {
  @Column({ type: 'varchar', length: 50, comment: '회사명' })
  name: string;

  @Column({ type: 'varchar', length: 100, comment: '국가' })
  country: string;

  @Column({ type: 'varchar', length: 150, comment: '지역' })
  area: string;

  createJobVacancy({ jobPosition, employmentCompensation, content, technology }: createJobVacancy): JobVacancy {
    const jobVacancy = new JobVacancy();
    jobVacancy.company = this;
    jobVacancy.employmentCompensation = employmentCompensation;
    jobVacancy.jobPosition = jobPosition;
    jobVacancy.content = content;
    jobVacancy.technology = technology;

    return jobVacancy;
  }
}

interface createJobVacancy {
  jobPosition: string;
  employmentCompensation: number;
  content: string;
  technology: string;
}
