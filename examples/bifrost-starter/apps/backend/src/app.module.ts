import { AdminModule } from '@adminjs/nestjs';
import { Database, Resource } from '@adminjs/typeorm';
import { AuthModule } from '@auth/auth.module';
import { AuthService } from '@auth/auth.service';
import { Session } from '@auth/session.entity';
import { MiddlewareConsumer, Module, RequestMethod, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import AdminJS from 'adminjs';
import { TypeormStore } from 'connect-typeorm';
import { Repository } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from './datasource.options';
import { validate } from './env.validation';
import { EntityNotFoundFilter } from './exception/entity-not-found.filter';
import { QueryFailedFilter } from './exception/query-failed.filter';
import { LoggerMiddleware } from './modules/logger/logger.middleware';
import { LoggerModule } from './modules/logger/logger.module';
import { UserModule } from './modules/user/user.module';

AdminJS.registerAdapter({ Database, Resource });

@Module({
  imports: [
    ConfigModule.forRoot({ validate, isGlobal: true, ignoreEnvFile: true }),
    TypeOrmModule.forRoot(dataSourceOptions),
    AdminModule.createAdminAsync({
      useFactory: (
        sessionRepository: Repository<Session>,
        configService: ConfigService,
        authService: AuthService,
      ) => {
        return {
          adminJsOptions: {
            rootPath: '/admin',
          },
          auth: {
            authenticate: async (email: string, password: string) => {
              try {
                return await authService.getUserFromCredentialsAndRoles({ email, password }, [
                  'admin',
                ]);
              } catch (error) {
                return null;
              }
            },
            cookieName: 'adminjs',
            cookiePassword: configService.getOrThrow('ADMINJS_COOKIE_SECRET'),
          },
          sessionOptions: {
            resave: false,
            saveUninitialized: false,
            secret: configService.getOrThrow('ADMINJS_SESSION_SECRET'),
            store: new TypeormStore({
              cleanupLimit: 2,
              ttl: 86400,
            }).connect(sessionRepository),
          },
        };
      },
      imports: [AuthModule],
      inject: [getRepositoryToken(Session), ConfigService, AuthService],
    }),

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
