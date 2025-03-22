import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateLawFirmDto } from './dto/create-law-firm.dto';
import { UpdateLawFirmDto } from './dto/update-law-firm.dto';
import { LawFirm } from './entities/law-firm.entity';
import { Repository } from 'typeorm';
import { EmailService } from 'src/email/email.service';
import { AuthService } from 'src/auth/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class LawFirmService {

  constructor(
      @InjectRepository(LawFirm)
        private lawFirmRepository: Repository<LawFirm>,
        private readonly emailService: EmailService,
        @Inject(forwardRef(() => AuthService))
        private readonly authservice :AuthService,
  ){}
  async create(createLawFirmDto: CreateLawFirmDto) {
     let email=createLawFirmDto.email
                 const existingUser = await this.lawFirmRepository.findOne({
                    where: {email},
                  });
                
                  if (existingUser) throw new BadRequestException('Email already registered');
             
              
              
               const confirmationCode = Math.floor(100000 + Math.random() * 900000).toString(); 
                email=  this.authservice.encryptEmail(createLawFirmDto.email); 
                const lawFirmName=createLawFirmDto.LawFirmName
                const password = await this.authservice.hashPassword(createLawFirmDto.password);
                const address=createLawFirmDto.address
                const phoneNumber=createLawFirmDto.phoneNumber
                const employeesNumber=createLawFirmDto.EmployeesNumber
             
                const newFirm = this.lawFirmRepository.create({
                email,
                address,
                phoneNumber,
                lawFirmName,
                password,
                employeesNumber,
                confirmationCode,
                confirmationExpires: new Date(Date.now() + 10 * 60 * 1000), 
                });
            
               const savedLawFirm = await this.lawFirmRepository.save(newFirm);
            
                await this.emailService.sendVerificationEmail(createLawFirmDto.email, confirmationCode);
              
               
                return { message: 'Verification code sent. Please check your email.' };
  }

  findAll() {
    return `This action returns all lawFirm`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lawFirm`;
  }

  update(id: number, updateLawFirmDto: UpdateLawFirmDto) {
    return `This action updates a #${id} lawFirm`;
  }

  remove(id: number) {
    return `This action removes a #${id} lawFirm`;
  }
}
