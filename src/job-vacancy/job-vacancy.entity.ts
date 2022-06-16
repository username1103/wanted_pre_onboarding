import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../common/BaseEntity';

@Entity({ name: 'job_vacancy' })
export class JobVacancy extends BaseEntity {
  // 추후 연관관계 필요시 설정
  @Column()
  companyId: number;

  @Column({ type: 'varchar', length: 50, comment: '채용포지션' })
  jobPosition: string;

  @Column({ comment: '채용보상금' })
  employmentCompensation: number;

  @Column({ type: 'text', comment: '채용내용' })
  content: string;

  @Column({ type: 'varchar', length: 250, comment: '사용기술' })
  technology: string;
}
