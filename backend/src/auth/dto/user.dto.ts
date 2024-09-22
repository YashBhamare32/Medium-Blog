import { Post } from '../../../db/entities/post';
import { IsString, IsUUID, IsNotEmpty, IsOptional } from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';

export class UserDto {
  @IsString()
  @IsNotEmpty() // Ensures that the username is required and not empty
  username: string;

  @IsString()
  @IsNotEmpty() // Ensures that the password is required and not empty
  password: string;

  @IsString()
  @IsNotEmpty() // Ensures that the name is required and not empty
  name: string;

  @IsOptional()
  posts: Post[];
}
export class SigninBodyDto extends OmitType(UserDto, ['name', 'posts'] as const) {}