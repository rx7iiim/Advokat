import {
    BadRequestException,
    forwardRef,
    HttpStatus,
    Inject,
    Injectable,
    Logger,
    UnauthorizedException,
  } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from 'src/email/email.service';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { error } from 'console';

@Injectable()
export class AuthService {
  constructor(
        
        @InjectRepository(User) private userRepository: Repository<User>,
        @Inject(forwardRef(() => UserService))
        private readonly userService:UserService,
        private readonly emailService: EmailService,
    ){}

         async signup(createUserDto: CreateUserDto){

            const user = this.userService.create(createUserDto);
            return user
          }
        
          async verifyEmail(email: string, code: string): Promise<string|null> {
            const user = await this.userService.findUserByEmail(email);
        
            if (!user) throw new Error('User not found');
        
            if (user.isEmailConfirmed) throw new Error('Email already confirmed');
        
            if (user.confirmationCode !== code) throw new Error('Invalid confirmation code');
        
            if (new Date() > user.confirmationExpires) throw new Error('Code expired');
        
            user.isEmailConfirmed = true;
            user.confirmationCode = "";
            await this.userRepository.save(user);
        
            return 'Email confirmed successfully!';
          
          }


          private secretKey = process.env.ENCRYPTION_KEY || '12345678910111213141516889944712'; // Must be 32 characters


 async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }


 encryptEmail(email: string): string {
    const cipher = crypto.createCipheriv(
      'aes-256-cbc', 
      Buffer.from(this.secretKey), 
      Buffer.alloc(16, 0) 
    );
    let encrypted = cipher.update(email, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }


   decryptEmail(encryptedEmail: string): string {
    const decipher = crypto.createDecipheriv(
      'aes-256-cbc', 
      Buffer.from(this.secretKey), 
      Buffer.alloc(16, 0)
    );
    let decrypted = decipher.update(encryptedEmail, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
            














          }
        