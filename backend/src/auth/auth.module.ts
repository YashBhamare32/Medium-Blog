import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../db/entities/user';
import { Post } from '../../db/entities/post';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: "postgres://avnadmin:AVNS_B4EwQZ2F07i8hUEr830@pg-3fb80bad-medium-blog1234.i.aivencloud.com:27773/Medium-Blog",
      entities: [User, Post],
      synchronize: true,
      uuidExtension: 'pgcrypto',
      ssl: {
        rejectUnauthorized: false
      },
    }),
    TypeOrmModule.forFeature([User, Post]),
    JwtModule.register({
      global: true,
      secret: 'yash123',
      signOptions: { expiresIn: '24h' },
    }),
  ],
})
export class AuthModule {}
