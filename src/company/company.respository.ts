import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Company } from './company.entity';

@Injectable()
export class CompanyRepository extends Repository<Company> {
  constructor(private readonly dataSource: DataSource) {
    super(Company, dataSource.createEntityManager(), dataSource.createQueryRunner());
  }

  findById(companyId: number): Promise<Company> {
    return this.findOneBy({ id: companyId });
  }
}
