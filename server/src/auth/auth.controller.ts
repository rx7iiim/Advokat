import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LocalAuthGuard, AuthenticatedGuard } from './guards/auth.guard';
import { loginUserDto } from 'src/user/dto/login-user.dto';
import { Request ,Response} from 'express';

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

  @Post('login')
  login(@Body() loginUserDto:loginUserDto,@Req() req: Request & { logIn: any; user?: any }, @Res() res: Response) {
    return this.authService.signIn(loginUserDto, req , res)
  }
}
