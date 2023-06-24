import { PartialType } from '@nestjs/swagger';

import CreateUserDto from './CreateUser.dto';

export default class UpdateUserDto extends PartialType(CreateUserDto) {}
