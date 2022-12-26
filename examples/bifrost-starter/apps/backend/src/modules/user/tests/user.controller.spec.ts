import { AuthService } from '@auth/auth.service';
import { GetUserDto } from '@bifrost-starter/interfaces';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppModule } from '@root/app.module';
import faker from 'faker';
import request from 'supertest';
import { Repository } from 'typeorm';

import { User } from '../user.entity';
import { UserFactory } from '../user.factory';

const generateUserDto = () => ({
  name: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.random.word(),
});

const generateUserWithRolesDto = () => ({
  ...generateUserDto(),
  roles: faker.random.arrayElement([['admin'], []]),
});

describe('UserController', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;
  let userFactory: UserFactory;
  let authService: AuthService;

  beforeAll(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    userRepository = testingModule.get(getRepositoryToken(User));
    userFactory = new UserFactory(userRepository);
    authService = testingModule.get(AuthService);
    app = testingModule.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await userRepository.clear();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST - /users', () => {
    it('should return 409 http code if email already exists', async () => {
      const user = await userFactory.createOne({ roles: [] });
      const userDto = generateUserDto();

      await request(app.getHttpServer())
        .post('/users')
        .send({ ...userDto, email: user.email })
        .expect(409);
    });

    it('should create a user with a hashed password', async () => {
      const userDto = generateUserDto();

      await request(app.getHttpServer())
        .post('/users')
        .send(userDto)
        .expect(201)
        .expect(async (response: { body: GetUserDto }) => {
          const databaseUser = await userRepository.findOneBy({ id: response.body.id });
          expect(databaseUser).toBeDefined();
          const { password, ...storedUserWithoutPassword } = databaseUser as User;
          // We compare json response to entity so we need to convert format not allowed in JSON like dates
          expect(JSON.parse(JSON.stringify(storedUserWithoutPassword))).toEqual(response.body);
          expect(password !== userDto.password).toBe(true);
        });
    });
  });

  describe('PATCH - /users', () => {
    it('should return 403 http code if user is not an admin', async () => {
      const [user, existingUser] = await userFactory.createMany([{ roles: [] }, {}]);
      const accessToken = authService.createAccessToken(user, 10000);
      const userDto = generateUserWithRolesDto();

      await request(app.getHttpServer())
        .patch(`/users/${existingUser.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(userDto)
        .expect(403);

      const userAfterPatch = await userRepository.findOneBy({ id: existingUser.id });
      // See Jest doc to understand how this works: https://jestjs.io/docs/expect#expectobjectcontainingobject
      expect(existingUser).toEqual(expect.objectContaining(userAfterPatch));
    });

    it('should update a given user and hash the password', async () => {
      const [adminUser, existingUser] = await userFactory.createMany([{ roles: ['admin'] }, {}]);
      const accessToken = authService.createAccessToken(adminUser, 10000);
      const userDto = generateUserWithRolesDto();

      const response = await request(app.getHttpServer())
        .patch(`/users/${existingUser.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(userDto)
        .expect(200);

      const userAfterPatch = await userRepository.findOneBy({ id: existingUser.id });
      const { password, ...userAfterPatchWithoutPassword } = userAfterPatch as User;
      // We compare json response to entity so we need to convert format not allowed in JSON like dates
      expect(JSON.parse(JSON.stringify(userAfterPatchWithoutPassword))).toEqual(response.body);
      expect(password !== userDto.password).toBe(true);
    });
  });

  describe('PATCH - /users', () => {
    it('should update the user calling the endpoint', async () => {
      const existingUser = await userFactory.createOne();
      const accessToken = authService.createAccessToken(existingUser, 10000);
      const userDto = generateUserDto();

      const response = await request(app.getHttpServer())
        .patch(`/users`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(userDto)
        .expect(200);

      const userAfterPatch = await userRepository.findOneBy({ id: existingUser.id });
      const { password, ...userAfterPatchWithoutPassword } = userAfterPatch as User;
      // We compare json response to entity so we need to convert format not allowed in JSON like dates
      expect(JSON.parse(JSON.stringify(userAfterPatchWithoutPassword))).toEqual(response.body);
      expect(password !== userDto.password).toBe(true);
    });
  });
});
