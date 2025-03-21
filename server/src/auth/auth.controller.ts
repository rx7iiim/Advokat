import { Controller, Post, Body, Req, Res, UseGuards, UnauthorizedException, Get, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LocalAuthGuard, AuthenticatedGuard } from './guards/auth.guard';
import { loginUserDto } from 'src/user/dto/login-user.dto';
import { Response, Request} from 'express';
import { GetUser } from 'common/decorators/auth/get-user.decorator';
import { SessionInterface } from 'src/types/session.interface';
import { ResponseInterface } from 'src/types/response.interface';
import { Console } from 'console';
import { AuthGuard } from '@nestjs/passport';


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
  @UseGuards(LocalAuthGuard)
  async login(@Req() req, @Res() res: Response) {
    console.log("✅ User logged in:", req.user);
    
    req.logIn(req.user, (err) => {
      if (err) {
        console.error("❌ Error logging in:", err);
        throw new UnauthorizedException('Login failed');
      }
  
      console.log("🛠️ Session after login:", req.session);
  
      res.json({ message: 'Login successful', user: req.user });
    });
  }


  @Get('session')
  async validateSession(
    @GetUser() user
  ): Promise<ResponseInterface<null>> {
    if (!user) {
      throw new UnauthorizedException('Invalid session');
    }
    await this.authService.checkUserValid(user.userId);
    return {
      authenticated:true,
      username:user.username,
      message: 'Session is valid',
      status: HttpStatus.OK,
    };
  }
}