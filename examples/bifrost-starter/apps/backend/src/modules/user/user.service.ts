import {
  AdminUpdateUserDto,
  CreateUserDto,
  GetUserDto,
  UpdateUserDto,
} from '@bifrost-starter/interfaces';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';

import { User } from './user.entity';

const SALT_ROUNDS = 10;

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  private hashPassword = async (password: string) => {
    return await hash(password, SALT_ROUNDS);
  };

  getUser = async (userId: string): Promise<GetUserDto> => {
    return await this.userRepository.findOneByOrFail({ id: userId });
  };

  createUser = async (userDto: CreateUserDto): Promise<GetUserDto> => {
    const existingUser = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: userDto.email })
      .getOne();

    if (existingUser) {
      throw new ConflictException();
    }

    const hashedPassword = await this.hashPassword(userDto.password);
    const { id: userId } = await this.userRepository.save({
      ...userDto,
      roles: [],
      password: hashedPassword,
    });

    return await this.getUser(userId);
  };

  updateUser = async (
    userId: string,
    userDto: UpdateUserDto | AdminUpdateUserDto,
  ): Promise<GetUserDto> => {
    await this.userRepository.findOneByOrFail({ id: userId });
    let user = userDto;

    if (userDto.password !== undefined) {
      const hashedPassword = await this.hashPassword(userDto.password);
      user = { ...user, password: hashedPassword };
    }

    await this.userRepository.save({ ...user, id: userId });

    return await this.getUser(userId);
  };
}
