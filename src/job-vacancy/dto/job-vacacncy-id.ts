import { ApiProperty } from '@nestjs/swagger';

export class JobVacancyId {
  @ApiProperty({ example: 1, description: '생성된 채용공고 아이디' })
  job_vacancy_id: number;
}
