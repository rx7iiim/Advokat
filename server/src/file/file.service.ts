import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFileDto } from 'src/file/dto/create-file.dto';
import { UpdateFileDto } from 'src/file/dto/update-file.dto';
import { File } from './entities/file.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Client } from 'src/client/entities/client.entity';
@Injectable()



 

export class FileService {


  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    @InjectRepository(User) private userRepositlory: Repository<User>,
  ) {} 



  async createFile(file: any ,username:string,id:string) :Promise<File>{
    const user= await this.userRepositlory.findOne({where:{username}});
    if (!user) throw new Error ("user not found");
    const name=file.originalname
    const file_path=`https://drive.google.com/file/d/${id}/preview`;
    const size=file.size

    const client=this.fileRepository.create({
      name,date:new Date(Date.now()),updated:new Date(Date.now()),file_path,user,size

    })
    return this.fileRepository.save(client)
 
  }

   async findAll(username:string): Promise<File[]> {
       return this.fileRepository.find({
         where: { user: {username } },
         relations: ['user'],
       });
     }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
