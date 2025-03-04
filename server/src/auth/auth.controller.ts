import { Controller, Post, Body, Query, Req, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('auth')
export class AuthController {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly authService:AuthService,
  
  ) {}

  @Post('signup')
  async signup(
    @Req() req: Request,
    @Body() createUserDto: CreateUserDto,
  ): Promise<User|null> {
    const user = await this.authService.signup(req , createUserDto);
    //const email= this.authService.decryptEmail(user.email)
    //const Mail= await this.userRepository.findOne({where:{email}})
    //if (Mail)
    //await this.authService.verifyEmail(Mail.email , Mail.confirmationCode);
    return user
  }

  //@Post('confirm-email')
  //async confirmEmail(@Query('token') token: string) {
   // return this.userService.confirmEmail(token);
  }
