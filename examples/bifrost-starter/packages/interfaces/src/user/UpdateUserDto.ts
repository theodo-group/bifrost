import { PartialType } from '@nestjs/mapped-types';

import CreateUserDto from './CreateUserDto';

export default class UpdateUserDto extends PartialType(CreateUserDto) {}
