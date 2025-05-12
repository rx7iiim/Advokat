import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateClientDto } from 'src/client/dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from 'src/client/entities/client.entity';
import { User } from 'src/user/entities/user.entity';
import { Lawyer } from './entities/lawyer.entity';
import { UserService } from 'src/user/user.service';
import { LawFirm } from 'src/law-firm/entities/law-firm.entity';
import { EmailService } from 'src/email/email.service';
@Injectable()
export class LawyerService {

  constructor(
    @Inject (forwardRef(()=>EmailService)) private emailService :EmailService,
    @InjectRepository(Lawyer) private readonly lawyerRepository: Repository<Lawyer>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject(forwardRef(() => UserService)) private userService:UserService,
  ) {}


  async createClient(body: any ,username:string,id:string):Promise<Lawyer>{ 
    console.log(username)
    const user= await this.userRepository.findOne({where:{username}});
    if (!user) throw new Error ("user not found");
    console.log(user)
    const lawyerUsername=body.fullName
    const email=body.email  
    const contactInfo=body.contactInfo
    const phoneNumber=body.phoneNumber
    const numberOfCasesLost=body.numberOfCasesLost
    const numberOfCasesWon=body.numberOfCasesWon
    const experienceYears =body.experienceYears
    const pfp=`https://drive.google.com/uc?export=view&id=${id}`;
    console.log(body)

    const client=this.lawyerRepository.create({
      lawyerUsername,
      email,
      contactInfo,
      phoneNumber,
      numberOfCasesLost,
      numberOfCasesWon,
      pfp,
      experienceYears,
      user
    })


       function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}
const password= generateRandomString(10)
    const createdto ={
      plan : user.plan,
      email : email,
      password :password,
      first_name: "edit you first name",
      last_name :"edit your last name",
      role :"firm lawyer",
      username: lawyerUsername,
      firmLawyer:true,
      lawFirm:user.lawFirm,
    }
    this.userService.create(createdto)
    this.emailService.sendCompanyAdditionEmail(email,password,user.lawFirm)



    return this.lawyerRepository.save(client)
  }    

  async getuserClients(username:string): Promise<Lawyer[]> {
     return this.lawyerRepository.find({
       where: { user: {username} },
       relations: ['user'],
     });
   }
 

 
 
 
   async deleteClient(phoneNumber: string): Promise<void> {
     const result = await this.lawyerRepository.delete({phoneNumber});

 
     if (result.affected === 0) {
       throw new NotFoundException(`Task with ID ${phoneNumber} not found`);
     }
 }
}
