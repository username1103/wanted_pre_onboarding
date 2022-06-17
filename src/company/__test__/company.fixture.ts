import { Company } from '../company.entity';
import { faker } from '@faker-js/faker/locale/ko';

export const getCompany = (id?: number) => {
  const company = new Company();
  company.id = id || faker.datatype.number({ min: 1 });
  company.name = faker.company.companyName();
  company.country = faker.address.country();
  company.area = faker.address.cityName();
  company.createdAt = new Date();
  company.updatedAt = new Date();
  return company;
};
