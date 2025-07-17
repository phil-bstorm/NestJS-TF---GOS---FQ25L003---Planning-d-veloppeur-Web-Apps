import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {
  InvalidLoginException,
  UsernameAlreadyExistsException,
} from 'src/shared/models/errors.model';

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
      // Sans "super" dans UsernameAlreadyExistsException
      // throw new UsernameAlreadyExistsException(`Username "${newUser.username}" already exists.`);
      // avec "super" dans UsernameAlreadyExistsException
      throw new UsernameAlreadyExistsException(newUser.username);
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
      throw new InvalidLoginException();
    }

    const isValidPassword = await bcrypt.compare(password, existingUsername.password);
    if (!isValidPassword) {
      throw new InvalidLoginException();
    }

    return existingUsername;
  }
}
