import { MiddlewareConsumer, Module, RequestMethod, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from 'auth/auth.module';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { LoggerModule } from './modules/logger/logger.module';
import { LoggerMiddleware } from './modules/logger/logger.middleware';
import { QueryFailedFilter } from './exception/query-failed.filter';
import { EntityNotFoundFilter } from './exception/entity-not-found.filter';
import { validate } from './env.validation';
import { dataSourceOptions } from './datasource.options';

@Module({
  imports: [
    ConfigModule.forRoot({ validate, isGlobal: true, ignoreEnvFile: true }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    AuthModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
    {
      provide: APP_FILTER,
      useClass: EntityNotFoundFilter,
    },
    {
      provide: APP_FILTER,
      useClass: QueryFailedFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
