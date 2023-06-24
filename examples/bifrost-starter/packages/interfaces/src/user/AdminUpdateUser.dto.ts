import { IsOptional, IsString } from 'class-validator';

import UpdateUserDto from './UpdateUser.dto';

export default class AdminUpdateUserDto extends UpdateUserDto {
  @IsString({ each: true }) @IsOptional() readonly roles!: string[];
}
