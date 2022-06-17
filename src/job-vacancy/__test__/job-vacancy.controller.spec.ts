import { DataSource } from 'typeorm';
import { Test } from '@nestjs/testing';
import { Company } from '../../company/company.entity';
import { CompanyModule } from '../../company/company.module';
import { DatabaseModule } from '../../common/config/database/database.module';
import { CreateJobVacancy } from '../dto/create-job-vacancy';
import { JobVacancyController } from '../job-vacancy.controller';
import { JobVacancyRepository } from '../job-vacancy.repository';
import { JobVacancyService } from '../job-vacancy.service';
import { CompanyRepository } from '../../company/company.respository';
import { CompanyNotFoudnException } from '../../common/exception/CompanyNotFoundException';

describe('JobVacancy Controller Spec', () => {
  let jobVacancyController: JobVacancyController;
  let companyRepository: CompanyRepository;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [DatabaseModule, CompanyModule],
      controllers: [JobVacancyController],
      providers: [JobVacancyService, JobVacancyRepository],
    }).compile();

    jobVacancyController = module.get(JobVacancyController);
    companyRepository = module.get(CompanyRepository);
    dataSource = module.get(DataSource);
  });

  afterEach(async () => {
    await dataSource.destroy();
  });

  describe('Create', () => {
    test('채용공고가 잘 생성되는가', async () => {
      // given
      const company = new Company();
      company.name = 'name';
      company.area = 'area';
      company.country = 'country';
      await companyRepository.save(company);

      const body: CreateJobVacancy = {
        companyId: company.id,
        content: 'test',
        employmentCompensation: 1000,
        jobPosition: 'tester',
        technology: 'test',
      };

      // when
      const result = await jobVacancyController.create(body);

      // then
      expect(result).toMatchObject({
        status: 'OK',
        message: '',
        data: {
          job_vacancy_id: expect.any(Number),
        },
      });
    });

    test('해당하는 회사가 존재하지 않으면 CompanyNotFoundException이 발생하는가', async () => {
      // given
      const body: CreateJobVacancy = {
        companyId: 1,
        content: 'test',
        employmentCompensation: 1000,
        jobPosition: 'tester',
        technology: 'test',
      };

      // when
      const result = jobVacancyController.create(body);

      // then
      await expect(result).rejects.toThrow(CompanyNotFoudnException);
    });
  });
});
