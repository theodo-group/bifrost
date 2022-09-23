import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('AppController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = testingModule.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      request(app.getHttpServer()).get('/').expect(200).expect('Hello World!');
    });
  });
});
