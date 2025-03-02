import { Controller, Post, Body, Query } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() body: { email: string; password: string ;first_name:string;last_name:string;username:string}) {
    return this.userService.createUser(body.email, body.password,body.first_name,body.last_name,body.username);
  }

  @Post('confirm-email')
  async confirmEmail(@Query('token') token: string) {
    return this.userService.confirmEmail(token);
  }
}
