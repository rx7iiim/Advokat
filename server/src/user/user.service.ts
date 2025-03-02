import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly emailService: EmailService,
  ) {}
 
  async createUser(email: string, password: string,first_name:string,last_name:string,username:string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const confirmationToken = randomBytes(32).toString('hex');
    const newUser = this.userRepository.create({ 
       email,
       password: hashedPassword ,
       first_name,
       last_name,
       username});
    return this.userRepository.save(newUser);
  }

  async sendConfirmationEmail(email: string, token: string) {
    const confirmLink = `http://localhost:3000/auth/confirm-email?token=${token}`;
    await this.emailService.sendMail(email, 'Confirm Your Email', `Click here: ${confirmLink}`);
    
  }

  async confirmEmail(token: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { confirmationToken: token } });
    if (!user) {
      throw new BadRequestException('Invalid or expired token');
    }

    user.isEmailConfirmed = true;
    user.confirmationToken = "";
    await this.userRepository.save(user);

    return 'Email confirmed successfully!';
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

  async findOne(user_id: number) :Promise<User|null>{
    return this.userRepository.findOne({where:{ user_id }});
  }

  update(user_id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${user_id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
