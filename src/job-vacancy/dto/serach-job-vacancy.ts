import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchJobVacancy {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  search?: string;
}
