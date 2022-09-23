import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  private expectedRoles: string[];
  constructor(expectedRoles: string[]) {
    if (expectedRoles.length === 0)
      throw new Error('RolesGuard must have at least on expected role');

    this.expectedRoles = expectedRoles;
  }

  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest<{ user: User | null }>();

    if (!user) return false;

    return user.roles.some((role) => this.expectedRoles.includes(role));
  }
}
