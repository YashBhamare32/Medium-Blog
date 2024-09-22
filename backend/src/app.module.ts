import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BlogController } from './blog/blog.controller';
import { BlogModule } from './blog/blog.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule, BlogModule,
    ConfigModule.forRoot({
      isGlobal: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
