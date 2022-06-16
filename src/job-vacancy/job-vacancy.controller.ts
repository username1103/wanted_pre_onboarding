import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JobVacancyService } from './job-vacancy.service';

@Controller('/job-vacancy')
@ApiTags('JobVacancy')
export class JobVacancyController {
  constructor(private readonly jobVacancyService: JobVacancyService) {}
}
