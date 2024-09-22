import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninBodyDto, UserDto } from './dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() user: UserDto) {
    return this.authService.signup(user);
  }

  @Post('signin')
  async signin(@Body() signinBody: SigninBodyDto){
    return this.authService.signin(signinBody);
  }

  @Get()
  async get(){
    return this.authService.get();
  }
}
