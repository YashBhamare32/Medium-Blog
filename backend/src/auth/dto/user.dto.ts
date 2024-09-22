import { Post } from '../../../db/entities/post';
import { IsString, IsUUID } from 'class-validator';

export class UserDto {
  @IsUUID()
  id: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  posts: Post[];
}
