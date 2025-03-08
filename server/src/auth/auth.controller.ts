import { Controller, Post, Body, Req, Res, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LocalAuthGuard, AuthenticatedGuard } from './guards/auth.guard';
import { loginUserDto } from 'src/user/dto/login-user.dto';
import { Response} from 'express';


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
  @UseGuards(LocalAuthGuard) 
  @Post('login')
  async login(@Request() req, @Res() res: Response) {
  req.logIn(req.user, (err) => {
    if (err) {
      throw new UnauthorizedException('Login failed');
    }
    res.json({ message: 'Login successful', user: req.user });
  });
  }
}
