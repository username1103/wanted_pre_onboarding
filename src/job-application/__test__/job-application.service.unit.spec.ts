import { anyNumber, anyOfClass, anything, instance, mock, reset, when } from 'ts-mockito';
import { getJobVacancy } from '../../job-vacancy/__test__/job-vacancy.fixture';
import { getUser } from '../../user/__test__/user.fixture';
import { JobVacancyRepository } from '../../job-vacancy/job-vacancy.repository';
import { UserRepository } from '../../user/user.respository';
import { JobApplicationRepository } from '../job-application.repository';
import { JobApplicationService } from '../job-application.service';
import { JobApplication } from '../job-application.entity';
import { getCompany } from '../../company/__test__/company.fixture';
import { UserNotFoudnException } from '../../common/exception/UserNotFoundException';
import { JobVacancyNotFoundException } from '../../common/exception/JobVacancyNotFoundException';
import { ExceededNumberOfApplicationException } from '../../common/exception/ExceededNumberOfApplicationsException';

describe('JobApplication Service Unit Test', () => {
  let sut: JobApplicationService;
  let userRepository: UserRepository;
  let jobVacancyRepository: JobVacancyRepository;
  let jobApplicationRepository: JobApplicationRepository;

  afterEach(async () => {
    reset(userRepository);
    reset(jobVacancyRepository);
    reset(jobApplicationRepository);
  });

  describe('create', () => {
    test('신청서가 생성되는가', async () => {
      // given
      const userFixture = getUser(1);
      const companyFixture = getCompany(1);
      const jobVacancyFixture = getJobVacancy(1, companyFixture);
      userRepository = mock(UserRepository);
      when(userRepository.findById(1)).thenResolve(userFixture);
      jobVacancyRepository = mock(JobVacancyRepository);
      when(jobVacancyRepository.findById(1)).thenResolve(jobVacancyFixture);
      jobApplicationRepository = mock(JobApplicationRepository);
      when(jobApplicationRepository.countBy(anything())).thenResolve(0);
      when(jobApplicationRepository.save(anyOfClass(JobApplication))).thenCall((jobApplication: JobApplication) => {
        jobApplication.id = 1;
        jobApplication.createdAt = new Date();
        jobApplication.updatedAt = new Date();
      });

      sut = new JobApplicationService(
        instance(jobApplicationRepository),
        instance(userRepository),
        instance(jobVacancyRepository),
      );

      // when
      const jobApplication = await sut.create(1, 1);

      // then
      expect(jobApplication).toMatchObject({
        id: 1,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });

      await expect(jobApplication.user).resolves.toMatchObject(userFixture);
      await expect(jobApplication.jobVacancy).resolves.toMatchObject(jobVacancyFixture);
    });
    test('유저가 존재하지 않는 경우 UserNotFoundException이 발생하는가', async () => {
      // given
      const companyFixture = getCompany(1);
      const jobVacancyFixture = getJobVacancy(1, companyFixture);
      userRepository = mock(UserRepository);
      when(userRepository.findById(anyNumber())).thenResolve(null);
      jobVacancyRepository = mock(JobVacancyRepository);
      when(jobVacancyRepository.findById(1)).thenResolve(jobVacancyFixture);
      jobApplicationRepository = mock(JobApplicationRepository);
      when(jobApplicationRepository.countBy(anything())).thenResolve(0);
      when(jobApplicationRepository.save(anyOfClass(JobApplication))).thenCall((jobApplication: JobApplication) => {
        jobApplication.id = 1;
        jobApplication.createdAt = new Date();
        jobApplication.updatedAt = new Date();
      });

      sut = new JobApplicationService(
        instance(jobApplicationRepository),
        instance(userRepository),
        instance(jobVacancyRepository),
      );
      // when
      const result = sut.create(1, 1);

      // then
      await expect(result).rejects.toThrow(UserNotFoudnException);
    });
    test('채용공고가 존재하지 않는 경우 JobVacancyNotFoundException이 발생하는가', async () => {
      // given
      const userFixture = getUser(1);
      userRepository = mock(UserRepository);
      when(userRepository.findById(anyNumber())).thenResolve(userFixture);
      jobVacancyRepository = mock(JobVacancyRepository);
      when(jobVacancyRepository.findById(1)).thenResolve(null);
      jobApplicationRepository = mock(JobApplicationRepository);
      when(jobApplicationRepository.countBy(anything())).thenResolve(0);
      when(jobApplicationRepository.save(anyOfClass(JobApplication))).thenCall((jobApplication: JobApplication) => {
        jobApplication.id = 1;
        jobApplication.createdAt = new Date();
        jobApplication.updatedAt = new Date();
      });

      sut = new JobApplicationService(
        instance(jobApplicationRepository),
        instance(userRepository),
        instance(jobVacancyRepository),
      );
      // when
      const result = sut.create(1, 1);

      // then
      await expect(result).rejects.toThrow(JobVacancyNotFoundException);
    });
    test('이미 신청 내역이 존재하는 경우 ExceededNumberOfApplicationsException이 발생하는가', async () => {
      // given
      const userFixture = getUser(1);
      const companyFixture = getCompany(1);
      const jobVacancyFixture = getJobVacancy(1, companyFixture);
      userRepository = mock(UserRepository);
      when(userRepository.findById(anyNumber())).thenResolve(userFixture);
      jobVacancyRepository = mock(JobVacancyRepository);
      when(jobVacancyRepository.findById(1)).thenResolve(jobVacancyFixture);
      jobApplicationRepository = mock(JobApplicationRepository);
      when(jobApplicationRepository.countBy(anything())).thenResolve(1);
      when(jobApplicationRepository.save(anyOfClass(JobApplication))).thenCall((jobApplication: JobApplication) => {
        jobApplication.id = 1;
        jobApplication.createdAt = new Date();
        jobApplication.updatedAt = new Date();
      });

      sut = new JobApplicationService(
        instance(jobApplicationRepository),
        instance(userRepository),
        instance(jobVacancyRepository),
      );
      // when
      const result = sut.create(1, 1);

      // then
      await expect(result).rejects.toThrow(ExceededNumberOfApplicationException);
    });
  });
});
