import { getCompany } from '../../company/__test__/company.fixture';
import { anyNumber, anyOfClass, anything, instance, mock, reset, when } from 'ts-mockito';
import { CompanyRepository } from '../../company/company.respository';
import { CreateJobVacancy } from '../dto/create-job-vacancy';
import { JobVacancy } from '../job-vacancy.entity';
import { JobVacancyRepository } from '../job-vacancy.repository';
import { JobVacancyService } from '../job-vacancy.service';
import { CompanyNotFoudnException } from '../../common/exception/CompanyNotFoundException';
import { getJobVacancy } from './job-vacancy.fixture';
import { JobVacancyNotFoundException } from '../../common/exception/JobVacancyNotFoundException';

describe('Job Vacancy Service Unit Test', () => {
  let sut: JobVacancyService;
  let companyRepository: CompanyRepository;
  let jobVacancyRepository: JobVacancyRepository;

  afterEach(async () => {
    reset(companyRepository);
    reset(jobVacancyRepository);
  });

  describe('create', () => {
    test('해당하는 회사에 채용공고가 생성되는가', async () => {
      // given
      const companyFixture = getCompany(1);
      companyRepository = mock(CompanyRepository);
      when(companyRepository.findById(1)).thenResolve(companyFixture);

      jobVacancyRepository = mock(JobVacancyRepository);
      when(jobVacancyRepository.save(anyOfClass(JobVacancy))).thenCall((jobVacancy: JobVacancy) => {
        jobVacancy.id = 1;
        jobVacancy.createdAt = new Date();
        jobVacancy.updatedAt = new Date();
        return jobVacancy;
      });

      sut = new JobVacancyService(instance(jobVacancyRepository), instance(companyRepository));

      const body: CreateJobVacancy = {
        companyId: 1,
        content: 'content',
        employmentCompensation: 10000,
        jobPosition: 'jobPosition',
        technology: 'tech',
      };

      // when
      const result = await sut.create(body);

      // then
      expect(result).toMatchObject({
        company: companyFixture,
        id: 1,
        content: 'content',
        employmentCompensation: 10000,
        jobPosition: 'jobPosition',
        technology: 'tech',
        updatedAt: expect.any(Date),
        createdAt: expect.any(Date),
      });
    });

    test('해당하는 회사가 없는 경우, CompanyNotFoundException을 반환하는가', async () => {
      // given
      companyRepository = mock(CompanyRepository);
      when(companyRepository.findById(anyNumber())).thenResolve(null);

      jobVacancyRepository = mock(JobVacancyRepository);
      when(jobVacancyRepository.save(anyOfClass(JobVacancy))).thenCall((jobVacancy: JobVacancy) => {
        jobVacancy.id = 1;
        jobVacancy.createdAt = new Date();
        jobVacancy.updatedAt = new Date();
        return jobVacancy;
      });

      sut = new JobVacancyService(instance(jobVacancyRepository), instance(companyRepository));

      const body: CreateJobVacancy = {
        companyId: 1,
        content: 'content',
        employmentCompensation: 10000,
        jobPosition: 'jobPosition',
        technology: 'tech',
      };
      // when
      const result = sut.create(body);

      // then
      await expect(result).rejects.toThrow(CompanyNotFoudnException);
    });
  });
  describe('update', () => {
    test('해당하는 채용공고의 정보가 변경되는가', async () => {
      // given
      const jobVacancyFixture = getJobVacancy(1);
      companyRepository = mock(CompanyRepository);

      jobVacancyRepository = mock(JobVacancyRepository);
      when(jobVacancyRepository.save(anyOfClass(JobVacancy))).thenResolve(undefined);
      when(jobVacancyRepository.findById(jobVacancyFixture.id)).thenResolve(jobVacancyFixture);

      sut = new JobVacancyService(instance(jobVacancyRepository), instance(companyRepository));

      // when
      const result = await sut.update(jobVacancyFixture.id, {
        content: 'change',
        employmentCompensation: 100000,
        jobPosition: 'change',
        technology: 'technology',
      });

      // then
      expect(result).toBeUndefined();
    });

    test('해당하는 채용공고가 없으면 JobVacancyNotFoundException이 발생하는가', async () => {
      // given
      companyRepository = mock(CompanyRepository);

      jobVacancyRepository = mock(JobVacancyRepository);
      when(jobVacancyRepository.save(anyOfClass(JobVacancy))).thenResolve(undefined);
      when(jobVacancyRepository.findById(anyNumber())).thenResolve(null);

      sut = new JobVacancyService(instance(jobVacancyRepository), instance(companyRepository));

      // when
      const result = sut.update(1, {
        content: 'change',
        employmentCompensation: 100000,
        jobPosition: 'change',
        technology: 'technology',
      });

      // then
      await expect(result).rejects.toThrow(JobVacancyNotFoundException);
    });
  });

  describe('delete', () => {
    test('해당하는 채용공고가 삭제되는가', async () => {
      // given
      const jobVacancyFixture = getJobVacancy(1);
      companyRepository = mock(CompanyRepository);

      jobVacancyRepository = mock(JobVacancyRepository);
      when(jobVacancyRepository.delete(anything())).thenResolve(undefined);
      when(jobVacancyRepository.findById(jobVacancyFixture.id)).thenResolve(jobVacancyFixture);

      sut = new JobVacancyService(instance(jobVacancyRepository), instance(companyRepository));

      // when
      const result = await sut.delete(jobVacancyFixture.id);

      // then
      expect(result).toBeUndefined();
    });

    test('해당하는 채용공고가 없으면 JobVacancyNotFoundException이 발생하는가', async () => {
      // given
      companyRepository = mock(CompanyRepository);

      jobVacancyRepository = mock(JobVacancyRepository);
      when(jobVacancyRepository.delete(anything())).thenResolve(undefined);
      when(jobVacancyRepository.findById(anyNumber())).thenResolve(null);

      sut = new JobVacancyService(instance(jobVacancyRepository), instance(companyRepository));

      // when
      const result = sut.delete(1);

      // then
      await expect(result).rejects.toThrow(JobVacancyNotFoundException);
    });
  });
});
