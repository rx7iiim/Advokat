import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup( @Req() req: Request,
  @Body() createUserDto: CreateUserDto,) {
    return this.authService.signup(createUserDto);
  }

  @Post('verify-email')
  async verifyEmail(@Body('email') email: string, @Body('code') code: string) {
    return this.authService.verifyEmail(email, code);
  }
}
