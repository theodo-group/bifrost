import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

import { User } from '@modules/user/user.entity';

type RequestWithUser = {
  user: User;
};

const isRequestWithUser = (request: unknown): request is RequestWithUser =>
  request !== null && typeof request === 'object' && 'user' in request;

export const UseUser = createParamDecorator((data: unknown, ctx: ExecutionContext): User => {
  const request = ctx.switchToHttp().getRequest<unknown>();

  if (!isRequestWithUser(request)) {
    throw new InternalServerErrorException();
  }

  return request.user;
});
