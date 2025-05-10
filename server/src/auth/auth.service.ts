import {
    forwardRef,
    Inject,
    Injectable,
  } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from 'src/email/email.service';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { CreateLawFirmDto } from 'src/law-firm/dto/create-law-firm.dto';
import { LawFirmService } from 'src/law-firm/law-firm.service';
import { LawFirm } from 'src/law-firm/entities/law-firm.entity';


@Injectable()
export class AuthService {
  constructor(
        
        @InjectRepository(User) private userRepository: Repository<User>,
        @Inject(forwardRef(() => UserService))
        private readonly userService:UserService,
        private readonly emailService: EmailService,
        @InjectRepository(User) private lawFirmRepository: Repository<LawFirm>,
        @Inject(forwardRef(() => LawFirmService))
        private readonly lawFirmService:LawFirmService,
       
    ){}

         async signup(createUserDto: CreateUserDto){

            const user = this.userService.create(createUserDto);
            return user
          }

          async signupLawFirm(createLawFirmDto: CreateLawFirmDto){

            const lawFirm = this.lawFirmService.create(createLawFirmDto);
            return lawFirm
          }
        
          async verifyEmail(email: string, code: string): Promise<string|null> {
            const user = await this.userService.findUserByEmail(this.encryptEmail(email));
        
            if (!user) throw new Error('User not found');
        
            if (user.isEmailConfirmed) return ('Email confirmed successfully!');
        
            if (user.confirmationCode !== code) return ('Invalid confirmation code');
        
            if (new Date() > user.confirmationExpires) return ('Code expired');
        
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


 encryptEmail(email): string {
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
            
  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
        console.log('User not found'); // Debugging
        return null; 
    }

    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) {
        console.log('Incorrect password'); // Debugging
        return null;
    }

    console.log('User authenticated'); // Debugging
    return user;
}

async findUserById(id: string) {
  return this.userService.findOneById(Number(id));
}


async checkUserValid(userId) {
  const user_obj = await this.userService.findOneById(userId);
  return true;
}
}
  





        