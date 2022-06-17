import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { SearchJobVacancy } from './dto/serach-job-vacancy';
import { JobVacancy } from './job-vacancy.entity';

@Injectable()
export class JobVacancyRepository extends Repository<JobVacancy> {
  constructor(private readonly dataSource: DataSource) {
    super(JobVacancy, dataSource.createEntityManager(), dataSource.createQueryRunner());
  }

  findById(jobVacacncyId: number) {
    return this.findOneBy({ id: jobVacacncyId });
  }

  findByCompanyId(companyId: number) {
    return this.find({
      where: {
        company: {
          id: companyId,
        },
      },
    });
  }

  serach(searchParams: SearchJobVacancy) {
    const qb = this.createQueryBuilder('jobVacancy').leftJoinAndSelect('jobVacancy.company', 'company');

    if (searchParams.search) {
      qb.orWhere('company.name like :search or jobVacancy.jobPosition like :search or jobVacancy.technology like :search', {
        search: `%${searchParams.search}%`,
      });
    }

    return qb.getMany();
  }
}
