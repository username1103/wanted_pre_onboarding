import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { JobVacancy } from './job-vacancy.entity';

@Injectable()
export class JobVacancyRepository extends Repository<JobVacancy> {
  constructor(private readonly dataSource: DataSource) {
    super(JobVacancy, dataSource.createEntityManager(), dataSource.createQueryRunner());
  }
}
