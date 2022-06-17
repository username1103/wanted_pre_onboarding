import { getJobVacancy } from '../../job-vacancy/__test__/job-vacancy.fixture';
import { getUser } from './user.fixture';

describe('User Entity Test', () => {
  describe('apply', () => {
    test('해당하는 채용공고에 대한 신청서를 리턴하는가', async () => {
      // given
      const userFixture = getUser();
      const jobVacancyFixture = getJobVacancy();

      // when
      const jobApplication = userFixture.apply(jobVacancyFixture);

      // then
      await expect(jobApplication.user).resolves.toMatchObject(userFixture);
      await expect(jobApplication.jobVacancy).resolves.toMatchObject(jobVacancyFixture);
    });
  });
});
