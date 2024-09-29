import { Post } from '../../../db/entities/post';
import { IsString, IsUUID, IsNotEmpty, IsOptional } from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  posts: Post[];
}
export class SigninBodyDto extends OmitType(UserDto, [
  'name',
  'posts',
] as const) {}

export class usernameDto {
  @IsNotEmpty()
  @IsString()
  username: string;
}
