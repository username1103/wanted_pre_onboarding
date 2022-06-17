import { ApiProperty } from '@nestjs/swagger';
import { JobApplication } from '../job-application.entity';

export class JobApplicationId {
  @ApiProperty({ description: '지원내역_id', example: 1 })
  jobApplicationId: number;

  static of(jobApplication: JobApplication) {
    const jobApplicationId = new JobApplicationId();
    jobApplicationId.jobApplicationId = jobApplication.id;
    return jobApplicationId;
  }
}
