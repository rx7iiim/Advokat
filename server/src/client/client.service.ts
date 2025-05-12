import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateClientDto } from 'src/client/dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from 'src/client/entities/client.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
@Injectable()
export class ClientService {

  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}


  async createClient(body: any ,username:string,id:string) {
    const user= await this.userRepository.findOne({where:{username}});
    if (!user) throw new Error ("user not found");
    const fullName=body.fullName
    const email=body.email  
    const contactInfo=body.contactInfo
    const phoneNumber=body.phoneNumber
    const pfp=`https://drive.google.com/uc?export=view&id=${id}`;

    const client=this.clientRepository.create({
      fullName,
      email,
      contactInfo,
      phoneNumber,
      pfp,
      user,
      created_at:new Date(Date.now())

    })
    return this.clientRepository.save(client)
  }

  async getuserClients(username:string): Promise<Client[]> {
     return this.clientRepository.find({
       where: { user: {username } },
       relations: ['user'],  
     });
   }
 
 
 
 
   async deleteClient(phoneNumber: string): Promise<void> {
     const result = await this.clientRepository.delete({phoneNumber});
 
     if (result.affected === 0) {
       throw new NotFoundException(`Task with ID ${phoneNumber} not found`);
     }
 }
}
