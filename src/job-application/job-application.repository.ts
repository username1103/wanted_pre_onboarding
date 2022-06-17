import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { JobApplication } from './job-application.entity';

@Injectable()
export class JobApplicationRepository extends Repository<JobApplication> {
  constructor(private readonly dataSource: DataSource) {
    super(JobApplication, dataSource.createEntityManager(), dataSource.createQueryRunner());
  }
}
