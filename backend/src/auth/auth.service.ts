import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../db/entities/user';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signup(user: UserDto) {
    try {
      const userCreated: User = await this.userRepository.create(user);
      if (userCreated) {
        return userCreated;
      }
    } catch (err) {
      console.log(err.message);
      throw new InternalServerErrorException(err.message);
    }
  }

  async getAll() {
    return await this.userRepository.find();
  }
}
