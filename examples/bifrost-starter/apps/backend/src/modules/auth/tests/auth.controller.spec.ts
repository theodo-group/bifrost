import { User } from '@modules/user/user.entity';
import { UserFactory } from '@modules/user/user.factory';
import { UserService } from '@modules/user/user.service';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppModule } from '@root/app.module';
import cookieParser from 'cookie-parser';
import faker from 'faker';
import request from 'supertest';
import { Repository } from 'typeorm';

import { REFRESH_TOKEN } from '../auth.controller';
import { AuthService } from '../auth.service';

describe('AppController', () => {
  let app: INestApplication;
  let userService: UserService;
  let authService: AuthService;
  let userRepository: Repository<User>;
  let userFactory: UserFactory;

  beforeAll(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    userService = testingModule.get(UserService);
    authService = testingModule.get(AuthService);
    userRepository = testingModule.get(getRepositoryToken(User));
    userFactory = new UserFactory(userRepository);
    app = testingModule.createNestApplication();
    // Needed in this test suite to parse refreshToken in headers
    app.use(cookieParser());

    await app.init();
  });

  afterEach(async () => {
    await userRepository.clear();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST - jwt/create', () => {
    it('should return 401 http code if user does not exist', async () => {
      const password = faker.random.word();
      const email = faker.internet.email();

      return request(app.getHttpServer())
        .post('/auth/jwt/create')
        .send({ email, password })
        .expect(401);
    });

    it('should return 401 http code if wrong credentials are provided', async () => {
      const email = faker.internet.email();
      await userService.createUser({
        name: faker.name.lastName(),
        email,
        password: 'correctPassword',
      });

      return request(app.getHttpServer())
        .post('/auth/jwt/create')
        .send({ email, password: 'notTheCorrectPassword' })
        .expect(401);
    });

    it('should return access and refresh token if correct credentials are provided', async () => {
      const password = faker.random.word();
      const email = faker.internet.email();

      await userService.createUser({
        name: faker.name.lastName(),
        email,
        password,
      });

      return request(app.getHttpServer())
        .post('/auth/jwt/create')
        .send({ email, password })
        .expect(201)
        .expect((response: { body: { access: string }; headers: { ['set-cookie']: string[] } }) => {
          expect(response.body.access).toBeDefined();
          expect(response.headers['set-cookie'][0]).toBeDefined();
          expect(response.headers['set-cookie'][0].includes('HttpOnly')).toBe(true);
          expect(response.headers['set-cookie'][0].includes('Secure')).toBe(true);
        });
    });

    it('should match email case insensitve', async () => {
      const password = faker.random.word();
      const email = faker.internet.email();

      await userService.createUser({
        name: faker.name.lastName(),
        email: email.toLocaleLowerCase(),
        password,
      });

      return request(app.getHttpServer())
        .post('/auth/jwt/create')
        .send({ email: email.toUpperCase(), password })
        .expect(201);
    });
  });

  describe('POST - jwt/refresh', () => {
    it('should return 401 http code if refresh token has expired', async () => {
      const user = await userFactory.createOne();
      const refreshToken = authService.createRefreshToken(user, 0);

      return request(app.getHttpServer())
        .post('/auth/jwt/refresh')
        .set('Cookie', `${REFRESH_TOKEN}=${refreshToken}`)
        .expect(401);
    });

    it('should return 401 http code if refresh token is not a valid jwt', async () => {
      return request(app.getHttpServer())
        .post('/auth/jwt/refresh')
        .set('Cookie', `${REFRESH_TOKEN}=Jean-ClaudeVanDamme`)
        .expect(401);
    });

    it('should return 401 http code if refresh token is valid but user does not exist', async () => {
      const user = await userFactory.createOne();
      const refreshToken = authService.createRefreshToken(user, 10000); // arbitrary value for ttl just to ensure token is still valid
      await userRepository.delete(user.id);

      return request(app.getHttpServer())
        .post('/auth/jwt/refresh')
        .set('Cookie', `${REFRESH_TOKEN}=${refreshToken}`)
        .expect(401);
    });

    it('should return 400 http code if refresh token is does not have the correct token type', async () => {
      const user = await userFactory.createOne();
      const refreshToken = authService.createAccessToken(user, 10000); // arbitrary value for ttl just to ensure token is still valid

      return request(app.getHttpServer())
        .post('/auth/jwt/refresh')
        .set('Cookie', `${REFRESH_TOKEN}=${refreshToken}`)
        .expect(400);
    });

    it('should return an access token if refresh token is valid and user exist', async () => {
      const user = await userFactory.createOne();
      const refreshToken = authService.createRefreshToken(user, 10000); // arbitrary value for ttl just to ensure token is still valid

      return request(app.getHttpServer())
        .post('/auth/jwt/refresh')
        .set('Cookie', `${REFRESH_TOKEN}=${refreshToken}`)
        .expect(201)
        .expect((response: { body: { access: string } }) => {
          expect(response.body.access).toBeDefined();
        });
    });
  });

  describe('POST - jwt/lougout', () => {
    it('should return 200 with delete cookie header', async () => {
      return request(app.getHttpServer())
        .post('/auth/jwt/logout')
        .expect(200)
        .expect((response: { headers: { ['set-cookie']: string[] } }) => {
          expect(response.headers['set-cookie'][0]).toEqual(
            'refresh_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
          );
        });
    });
  });
});
