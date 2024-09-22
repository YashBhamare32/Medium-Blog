import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../db/entities/user';
import { Post } from '../../db/entities/post';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'Bobby@2032',
      database: 'mediumblog',
      entities: [User, Post],
      synchronize: false,
      uuidExtension: 'pgcrypto',
    }),
    TypeOrmModule.forFeature([User, Post]),
  ],
})
export class AuthModule {}
