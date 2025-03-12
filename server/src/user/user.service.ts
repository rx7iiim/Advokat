import { Injectable, NotFoundException,BadRequestException, forwardRef, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from 'src/email/email.service';
import { AuthService } from 'src/auth/auth.service';
@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly emailService: EmailService,
    @Inject(forwardRef(() => AuthService))
    private readonly authservice :AuthService,
  ) {}
 

   async create(createUserDto:CreateUserDto){
    let email=createUserDto.email
             const existingUser = await this.userRepository.findOne({
                where: {email},
              });
            
              if (existingUser) throw new BadRequestException('Email already registered');
         
            const confirmationCode = Math.floor(100000 + Math.random() * 900000).toString();
           
            email=  this.authservice.encryptEmail(createUserDto.email); 
            const username=createUserDto.username
            const password = await this.authservice.hashPassword(createUserDto.password);
            const firstName=createUserDto.first_name
            const lastName=createUserDto.last_name
            const phoneNumber=createUserDto.phoneNumber
    
            const newUser = this.userRepository.create({
            email,
            username,
            password,
            firstName,
            lastName,
            phoneNumber,
            confirmationCode,
            confirmationExpires: new Date(Date.now() + 10 * 60 * 1000), 
            });
        
           const savedUser = await this.userRepository.save(newUser);
        
            await this.emailService.sendVerificationEmail(createUserDto.email, confirmationCode);
          
           
            return { message: 'Verification code sent. Please check your email.' };

   }
  findAll() {
    return this.userRepository.find();

  }
  async findUserByEmail(email: string) : Promise<User|null>{
    const user= await this.userRepository.findOne({where:{email}})
    if (!user) {
      throw new NotFoundException(`User with ID ${email} not found`);
    }
    return user
  }

  async findOneByUsername(username:string) :Promise<User|null>{
    return this.userRepository.findOne({where:{ username }});
  }

  async findOne(userId: number) :Promise<User|null>{
    return this.userRepository.findOne({where:{ userId }});
  }

  async findByEmailOrUsername(email?: string, username?: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: [
        { email: email || '' },
        { username: username || '' },
      ],
    });
  }

  update(userId: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${userId} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
