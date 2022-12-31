import { Controller } from '@decorators/controller';
import { Post } from '@decorators/httpDecorators';
import { Body, Req, Res } from '@nestjs/common';
import { Environment } from '@root/env.validation';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { Credentials } from './interfaces/credentials.dto';

export const REFRESH_TOKEN = 'refresh_token';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('jwt/create', { isPublic: true })
  async createJwt(@Body() credentials: Credentials, @Res() res: Response): Promise<Response> {
    const { access, refresh } = await this.authService.checkCredentials(credentials);

    res.cookie(REFRESH_TOKEN, refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== Environment.Development,
    });

    return res.send({ access });
  }

  @Post('jwt/refresh', { isPublic: true })
  async refreshJwt(@Req() req: Request): Promise<{ access: string }> {
    const access = await this.authService.checkRefreshToken(
      (req.cookies as { [REFRESH_TOKEN]: string })[REFRESH_TOKEN],
    );

    return { access };
  }

  @Post('jwt/logout', { isPublic: true })
  logout(@Res() res: Response): Response {
    res.clearCookie(REFRESH_TOKEN);

    return res.sendStatus(200);
  }
}
