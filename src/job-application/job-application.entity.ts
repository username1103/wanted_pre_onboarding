import { User } from '../user/user.entity';
import { Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from '../common/BaseEntity';
import { JobVacancy } from '../job-vacancy/job-vacancy.entity';

@Entity({ name: 'job_application' })
@Unique('unique_user_id_job_vacancy_id', ['user', 'jobVacancy'])
export class JobApplication extends BaseEntity {
  @ManyToOne(() => User, { lazy: true })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: Promise<User>;

  @ManyToOne(() => JobVacancy, { lazy: true })
  @JoinColumn({ name: 'job_vacancy_id', referencedColumnName: 'id' })
  jobVacancy: Promise<JobVacancy>;
}
