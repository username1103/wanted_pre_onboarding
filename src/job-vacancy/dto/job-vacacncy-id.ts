import { ApiProperty } from '@nestjs/swagger';
import { JobVacancy } from '../job-vacancy.entity';

export class JobVacancyId {
  @ApiProperty({ example: 1, description: '생성된 채용공고 아이디' })
  jobVacancyId: number;

  static of(jobVacancy: JobVacancy) {
    const jobVacancyId = new JobVacancyId();
    jobVacancyId.jobVacancyId = jobVacancy.id;
    return jobVacancyId;
  }
}
