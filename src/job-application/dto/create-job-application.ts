import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class CreateJobApplication {
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @ApiProperty({ description: '사용자_id', example: 1 })
  userId: number;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @ApiProperty({ description: '채용공고_id', example: 1 })
  jobVacancyId: number;
}
