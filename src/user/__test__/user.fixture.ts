import { faker } from '@faker-js/faker/locale/ko';
import { User } from '../user.entity';

export const getUser = (id?: number) => {
  const user = new User();
  user.id = id || faker.datatype.number({ min: 1 });
  user.name = faker.name.findName() + faker.name.lastName();
  user.createdAt = new Date();
  user.updatedAt = new Date();
  return user;
};
