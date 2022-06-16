import { BaseEntity } from '../common/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 40 })
  name: string;
}
