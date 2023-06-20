import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { CustomAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { Session } from './session.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrKeyProvider: () => {
        const secretKey = process.env.SECRET_KEY;
        if (secretKey === undefined) {
          throw new Error('Secret Key is not defined');
        }

        return secretKey;
      },
      signOptions: {
        expiresIn: 3600,
      },
    }),
    UserModule,
    TypeOrmModule.forFeature([Session]),
  ],
  exports: [TypeOrmModule, AuthService],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, { provide: APP_GUARD, useClass: CustomAuthGuard }],
})
export class AuthModule {}
