import { TokenType } from '@auth/interfaces/token-type.enum';
import { CustomLogger } from '@modules/logger/custom-logger.service';
import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

import { User } from '../user/user.entity';
import { Credentials } from './interfaces/credentials.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
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
      .where('user.email ILIKE :email', { email: credentials.email })
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
      access: this.createAccessToken(user, ACCESS_TOKEN_MINUTES_TO_LIVE),
      refresh: this.createRefreshToken(user, REFRESH_TOKEN_MINUTES_TO_LIVE),
    };
  }

  async checkRefreshToken(stringToken: string): Promise<string> {
    try {
      const refreshToken: JwtPayload = this.jwtService.verify(stringToken);

      if (refreshToken.type !== TokenType.REFRESH) {
        throw new BadRequestException("This type of token can't be used for refresh");
      }

      const user = await this.userRepository.findOneByOrFail({ id: refreshToken.userId });

      return this.createJwt(user, ACCESS_TOKEN_MINUTES_TO_LIVE, TokenType.ACCESS);
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

  createAccessToken(user: User, minutesToLive: number): string {
    return this.createJwt(user, minutesToLive, TokenType.ACCESS);
  }

  createRefreshToken(user: User, minutesToLive: number): string {
    return this.createJwt(user, minutesToLive, TokenType.REFRESH);
  }

  private createJwt(user: User, minutesToLive: number, type: TokenType): string {
    const token = this.jwtService.sign(
      { userId: user.id, type },
      { expiresIn: minutesToLive * 60 },
    );

    this.logger.log(`token created, type ${type}, value ${token}`);

    return token;
  }

  async validateUser(userId: string): Promise<User | null> {
    try {
      return await this.userRepository.findOneByOrFail({ id: userId });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        this.logger.warn('Access token for unknown user received');
      }

      return null;
    }
  }
}
