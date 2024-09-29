import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninBodyDto, UserDto, usernameDto } from './dto/user.dto';
import { AuthGuard } from '../blog/user.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() user: UserDto) {
    return this.authService.signup(user);
  }

  @Post('signin')
  async signin(@Body() signinBody: SigninBodyDto) {
    return this.authService.signin(signinBody);
  }

  @Get('user/:userId')
  @UseGuards(AuthGuard)
  async getUserByUsername(@Param('userId') username: string) {
    return this.authService.getUserByUsername({ username });
  }
}
