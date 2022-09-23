import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from 'modules/user/user.entity';

export const UseUser = createParamDecorator((data: unknown, ctx: ExecutionContext): User => {
  const request = ctx.switchToHttp().getRequest();

  const user: User | undefined = request.user;
  if (!user) {
    throw new InternalServerErrorException();
  }

  return request.user;
});
