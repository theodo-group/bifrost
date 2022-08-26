import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { compare } from 'bcrypt';
import { CustomLogger } from 'modules/logger/custom-logger.service';
import { Credentials } from './interfaces/credentials.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from '../user/user.entity';
import { JwtToken } from './interfaces/jwt-token.interface';

const ACCESS_TOKEN_MINUTES_TO_LIVE = 10;
const REFRESH_TOKEN_MINUTES_TO_LIVE = 525600; // 1 year

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(CustomLogger) private readonly logger: CustomLogger,
  ) {
    this.logger.setContext('AuthService');
  }

  async checkCredentials(credentials: Credentials): Promise<JwtToken> {
    // We need to use a query builder to bypass hidden password
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email: credentials.email })
      .getOne();

    if (!user) {
      // Keep this line it's there to avoid timing difference between existing and non existing users
      await compare(credentials.password, 'Jean-Claude Van Damme');
      throw new UnauthorizedException();
    }

    const areCredentialsValid = await compare(credentials.password, user.password);
    if (!areCredentialsValid) {
      throw new UnauthorizedException();
    }

    return {
      access: this.createJwt(user, ACCESS_TOKEN_MINUTES_TO_LIVE),
      refresh: this.createJwt(user, REFRESH_TOKEN_MINUTES_TO_LIVE),
    };
  }

  async checkRefreshToken(stringToken: string): Promise<string> {
    try {
      const refreshToken: JwtPayload = this.jwtService.verify(stringToken);

      const user = await this.userRepository.findOneByOrFail({ id: refreshToken.user_id });

      return this.createJwt(user, ACCESS_TOKEN_MINUTES_TO_LIVE);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        this.logger.warn('Refresh token for unknown user received');
        throw new UnauthorizedException();
      }

      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException();
      }

      if (error instanceof JsonWebTokenError) {
        this.logger.warn('Wrongly signed refresh token received');
        throw new UnauthorizedException();
      }

      throw error;
    }
  }

  createJwt(user: User, minutesToLive: number): string {
    return this.jwtService.sign({ user_id: user.id }, { expiresIn: minutesToLive * 60 });
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    try {
      return await this.userRepository.findOneByOrFail({ id: payload.user_id });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        this.logger.warn('Access token for unknown user received');
        throw new UnauthorizedException();
      }
      throw error;
    }
  }
}
