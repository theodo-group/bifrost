import { Factory } from '@testUtils/factory';
import faker from 'faker';

import { User } from './user.entity';

export class UserFactory extends Factory<User> {
  protected createBase = (user?: Partial<User>): User =>
    ({
      name: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.random.word(),
      roles: faker.random.arrayElement([['admin'], []]),
      ...user,
    } as User);
}
