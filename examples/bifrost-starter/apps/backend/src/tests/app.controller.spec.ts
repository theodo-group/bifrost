import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@root/app.module';
import request from 'supertest';

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
    it('should return "Hello World!"', async () => {
      await request(app.getHttpServer()).get('/').expect(200).expect('Hello World!');
    });
  });
});
