import { BaseEntity } from '../common/BaseEntity';
import { Column, Entity } from 'typeorm';
import { JobVacancy } from '../job-vacancy/job-vacancy.entity';
import { JobApplication } from '../job-application/job-application.entity';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 40 })
  name: string;

  apply(jobVacancy: JobVacancy) {
    const jobApplication = new JobApplication();
    jobApplication.user = Promise.resolve(this);
    jobApplication.jobVacancy = Promise.resolve(jobVacancy);
    return jobApplication;
  }
}
