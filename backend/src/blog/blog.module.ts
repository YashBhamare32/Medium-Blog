import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'db/entities/user';
import { JwtModule } from '@nestjs/jwt';
import { BlogController } from './blog.controller';
import { Post } from 'db/entities/post';

@Module({
  providers: [BlogService],
  controllers:[BlogController],
  imports:[
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: "postgres://avnadmin:AVNS_B4EwQZ2F07i8hUEr830@pg-3fb80bad-medium-blog1234.i.aivencloud.com:27773/Medium-Blog",
      entities: [Post, User],
      synchronize: true,
      uuidExtension: 'pgcrypto',
      ssl: {
        rejectUnauthorized: false
      },
    }),
    TypeOrmModule.forFeature([Post, User]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ]
})
export class BlogModule {}
