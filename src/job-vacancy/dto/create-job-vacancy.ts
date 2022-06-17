import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min } from 'class-validator';

export class CreateJobVacancy {
  @IsInt()
  @Min(1)
  @ApiProperty({ example: 1, description: '회사 아이디' })
  companyId: number;

  @IsString()
  @ApiProperty({ example: '백엔드 주니어 개발자', description: '채용포지션' })
  jobPosition: string;

  @IsInt()
  @Min(1)
  @ApiProperty({ example: 1000000, description: '채용보상금' })
  employmentCompensation: number;

  @IsString()
  @ApiProperty({ example: '원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..', description: '채용내용' })
  content: string;

  @IsString()
  @ApiProperty({ example: 'Python', description: '사용기술' })
  technology: string;
}
