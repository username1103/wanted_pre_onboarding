import { Company } from '../company/company.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../common/BaseEntity';

@Entity({ name: 'job_vacancy' })
export class JobVacancy extends BaseEntity {
  @ManyToOne(() => Company, { lazy: true })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: Promise<Company>;

  @Column({ type: 'varchar', length: 50, comment: '채용포지션' })
  jobPosition: string;

  @Column({ comment: '채용보상금' })
  employmentCompensation: number;

  @Column({ type: 'text', comment: '채용내용' })
  content: string;

  @Column({ type: 'varchar', length: 250, comment: '사용기술' })
  technology: string;

  update(updateInfo: { jobPosition: string; employmentCompensation: number; content: string; technology: string }) {
    this.jobPosition = updateInfo.jobPosition;
    this.employmentCompensation = updateInfo.employmentCompensation;
    this.content = updateInfo.content;
    this.technology = updateInfo.technology;
  }
}
