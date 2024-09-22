import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../db/entities/user';
import { Repository } from 'typeorm';
import { SigninBodyDto, UserDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async signup(user: UserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({ where: { username: user.username } });
  
    if (existingUser) {
      throw new BadRequestException(`User with username ${user.username} already exists`);
    }
  
    const userCreated: User = this.userRepository.create(user);
  
    try {
      const savedUser = await this.userRepository.save(userCreated);
      console.log("User created with username: ", savedUser.username);
      return savedUser;
    } catch (err) {
      console.log(err.message);
      throw new InternalServerErrorException('Error creating user: ' + err.message);
    }
  }
  

  async signin(signinBody: SigninBodyDto){
    try {
      const user = await this.userRepository.findOne({ where: { username: signinBody.username } });
      if(!(user && user.password === signinBody.password)){
        throw new BadRequestException(`Invalid credentials`)
      }
      const payload = { id: user.id, username: user.username, name: user.name };
      return this.jwtService.signAsync(payload);
    } catch (err) {
      console.log(err.message);
      throw new InternalServerErrorException('Error creating user: ' + err.message);
    }
  }

  async get(){
    return this.userRepository.find();
  }
}
