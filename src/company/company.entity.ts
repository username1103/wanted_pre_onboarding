import { BaseEntity } from '../common/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'company' })
export class Company extends BaseEntity {
  @Column({ type: 'varchar', length: 50, comment: '회사명' })
  name: string;

  @Column({ type: 'varchar', length: 100, comment: '국가' })
  country: string;

  @Column({ type: 'varchar', length: 150, comment: '지역' })
  area: string;
}
