import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateClientDto } from 'src/client/dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from 'src/client/entities/client.entity';
import { User } from 'src/user/entities/user.entity';

import { LawFirm } from 'src/law-firm/entities/law-firm.entity';
import { Lawyer } from './entities/lawyer.entity';
@Injectable()
export class LawyerService {

  constructor(
    @InjectRepository(LawFirm)
    private readonly lawyerRepository: Repository<Lawyer>,

    @InjectRepository(LawFirm) private userRepository: Repository<LawFirm>,
  ) {}


  async createClient(body: any ,lawFirmName:string,id:string) {
    const lawFirm= await this.userRepository.findOne({where:{lawFirmName}});
    if (!lawFirm) throw new Error ("user not found");
    const fullName=body.fullName
    const email=body.email  
    const contactInfo=body.contactInfo
    const phoneNumber=body.phoneNumber
    //const number
    const pfp=`https://drive.google.com/uc?export=view&id=${id}`;

    const client=this.lawyerRepository.create({
      fullName,
      email,
      contactInfo,
      phoneNumber,
      pfp,
      lawFirm,
   

    })
    return this.lawyerRepository.save(client)
  }    

  async getuserClients(lawFirmName:string): Promise<Lawyer[]> {
     return this.lawyerRepository.find({
       where: { lawFirm: {lawFirmName } },
       relations: ['lawFirm'],
     });
   }
 
 
 
 
   async deleteClient(id: number): Promise<void> {
     const result = await this.lawyerRepository.delete(id);
 
     if (result.affected === 0) {
       throw new NotFoundException(`Task with ID ${id} not found`);
     }
 }
}
