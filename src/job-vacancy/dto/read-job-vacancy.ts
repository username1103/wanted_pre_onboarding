import { ApiProperty } from '@nestjs/swagger';
import { JobVacancy } from '../job-vacancy.entity';

export class ReadJobVacancy {
  @ApiProperty({ description: '채용공고_id', example: 1 })
  jobVacancyId: number;

  @ApiProperty({ description: '회사명', example: '원티드랩' })
  companyName: string;

  @ApiProperty({ description: '국가', example: '한국' })
  companyCountry: string;

  @ApiProperty({ description: '지역', example: '서울' })
  companyArea: string;

  @ApiProperty({ description: '채용포지션', example: '주니어 백엔드 개발자' })
  jobPosition: string;

  @ApiProperty({ description: '채용보상금', example: 1500000 })
  employmentCompensation: number;

  @ApiProperty({ description: '사용기술', example: 'Python' })
  technology: string;

  @ApiProperty({ description: '채용내용', example: '원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..' })
  content: string;

  @ApiProperty({ type: 'number', isArray: true, description: '회사가 올린 다른 채용 공고', example: [1, 2, 3] })
  otherJobVacancyIds: number[];

  static async of(jobVacancy: JobVacancy, otherIds: number[]) {
    const dto = new ReadJobVacancy();
    const company = await jobVacancy.company;
    dto.jobVacancyId = jobVacancy.id;
    dto.companyName = company.name;
    dto.companyCountry = company.country;
    dto.companyArea = company.area;
    dto.jobPosition = jobVacancy.jobPosition;
    dto.employmentCompensation = jobVacancy.employmentCompensation;
    dto.technology = jobVacancy.technology;
    dto.content = jobVacancy.content;
    dto.otherJobVacancyIds = otherIds;
    return dto;
  }
}
