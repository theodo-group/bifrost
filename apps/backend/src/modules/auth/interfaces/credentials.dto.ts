import { IsString } from 'class-validator';

export class Credentials {
  @IsString() readonly email!: string;
  @IsString() readonly password!: string;
}
