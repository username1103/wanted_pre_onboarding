import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JobVacancy } from './job-vacancy.entity';

@Injectable()
export class JobVacancyRepository extends Repository<JobVacancy> {}
