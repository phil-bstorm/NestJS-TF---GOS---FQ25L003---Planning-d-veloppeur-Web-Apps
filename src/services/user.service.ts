import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

// nest g s services/user

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(newUser: UserEntity) {
    const existingUsername = await this.userRepository.findOne({
      where: {
        username: newUser.username.toLowerCase(),
      },
    });

    if (existingUsername) {
      throw new Error('Username already exists!');
    }

    newUser.password = await bcrypt.hash(newUser.password, 10);

    return this.userRepository.save(newUser);
  }

  async login(username: string, password: string) {
    const existingUsername = await this.userRepository.findOne({
      where: {
        username: username.toLowerCase(),
      },
    });

    if (!existingUsername) {
      throw new Error('Invalid login');
    }

    const isValidPassword = await bcrypt.compare(password, existingUsername.password);
    if (!isValidPassword) {
      throw new Error('Invalid login');
    }

    return existingUsername;
  }
}
