import { PartialType } from '@nestjs/swagger';
import CreateUserDto from './CreateUserDto';

export default class UpdateUserDto extends PartialType(CreateUserDto) {}
