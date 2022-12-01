import { IsOptional, IsString } from 'class-validator';
import UpdateUserDto from './UpdateUserDto';

export default class AdminUpdateUserDto extends UpdateUserDto {
  @IsString({ each: true }) @IsOptional() readonly roles!: string[];
}
