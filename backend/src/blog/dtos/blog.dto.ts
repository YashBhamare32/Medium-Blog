import { OmitType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsBoolean()
  published: boolean;
}

export class GetBlogByIdDto {
  @IsUUID()
  id: string;
}

export class GetBlogByUserDto {
  @IsUUID()
  authorId: string;
}
