import { getJobVacancy } from './job-vacancy.fixture';

describe('Job Vacancy Entity Test', () => {
  describe('update', () => {
    test('해당하는 정보로 채용공고가 변경되는가', async () => {
      // given
      const jobVacancyFixture = getJobVacancy(1);

      // when
      jobVacancyFixture.update({
        jobPosition: 'changeJobPosition',
        content: 'changeContent',
        employmentCompensation: 50000,
        technology: 'changeTechnology',
      });

      // then
      expect(jobVacancyFixture).toMatchObject({
        ...jobVacancyFixture,
        jobPosition: 'changeJobPosition',
        content: 'changeContent',
        employmentCompensation: 50000,
        technology: 'changeTechnology',
      });
    });
  });
});
