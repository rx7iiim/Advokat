import { Controller, Post, Body, Req, Res, UseGuards, UnauthorizedException, Get, HttpStatus, Query, Put } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Response, Request} from 'express';
import { GetUser } from 'src/common/decorators/auth/get-user.decorator';
import { ResponseInterface } from 'src/types/response.interface';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from './guards/auth.guard';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup( @Req() req: Request,
  @Body() createUserDto: CreateUserDto,) {
    return this.authService.signup(createUserDto);
  }
  @Put('update')
  async update(@Req() req:Request ,
 
  @Body() updateUserDto: UpdateUserDto, ) {
    return this.authService.updateUser( updateUserDto);

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
    @GetUser() user:User,
  ) {
    if (!user) {
      throw new UnauthorizedException('Invalid session');
    }
    await this.authService.checkUserValid(user.userId);
    return{
      authenticated:true,
      username:user.username,
      message: 'Session is valid',
      user:user
    };
  }
}