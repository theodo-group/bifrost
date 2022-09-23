import { PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './createUser.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class AdminUpdateUserDto extends UpdateUserDto {
  @IsString({ each: true }) @IsOptional() readonly roles!: string[];
}
