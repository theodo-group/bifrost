import { TokenType } from '@auth/interfaces/token-type.enum';

export interface JwtPayload {
  userId: string;
  exp: number;
  type: TokenType;
}
