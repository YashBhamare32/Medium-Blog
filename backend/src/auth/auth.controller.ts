import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() user: UserDto) {
    return this.authService.signup(user);
  }

  @Get('/getAll')
  async getAll() {
    return await this.authService.getAll();
  }
}
