import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../common/BaseEntity';

@Entity({ name: 'job_application' })
export class JobApplication extends BaseEntity {
  // 추후 필요시 유저 엔티티 연결
  @Column()
  userId: number;

  // 추후 필요시 채용공고(job_vacancy) 엔티티와 연결
  @Column()
  jobVacancyId: number;
}
