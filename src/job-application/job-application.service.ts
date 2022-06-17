import { Injectable } from '@nestjs/common';
import { ExceededNumberOfApplicationException } from '../common/exception/ExceededNumberOfApplicationsException';
import { JobVacancyNotFoundException } from '../common/exception/JobVacancyNotFoundException';
import { UserNotFoudnException } from '../common/exception/UserNotFoundException';
import { JobVacancyRepository } from '../job-vacancy/job-vacancy.repository';
import { UserRepository } from '../user/user.respository';
import { JobApplicationRepository } from './job-application.repository';

@Injectable()
export class JobApplicationService {
  constructor(
    private readonly jobApplicationRepository: JobApplicationRepository,
    private readonly userRepository: UserRepository,
    private readonly jobVacancyRepository: JobVacancyRepository,
  ) {}

  async create(userId: number, jobVacancyId: number) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UserNotFoudnException();
    }

    const jobVacancy = await this.jobVacancyRepository.findById(jobVacancyId);
    if (!jobVacancy) {
      throw new JobVacancyNotFoundException();
    }

    if ((await this.jobApplicationRepository.countBy({ user: { id: userId }, jobVacancy: { id: jobVacancyId } })) > 0) {
      throw new ExceededNumberOfApplicationException();
    }

    const jobApplication = user.apply(jobVacancy);

    await this.jobApplicationRepository.save(jobApplication);

    return jobApplication;
  }
}
