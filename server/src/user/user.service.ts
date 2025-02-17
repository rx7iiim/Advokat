import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
 async create(createUserDto: CreateUserDto):Promise <User> {
    const user=this.userRepository.create(createUserDto)
    return  this.userRepository.save(user);

  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number):Promise <User>{
    const user= await this.userRepository.findOne({where:{id}});
    if(!user) throw new NotFoundException("User with ${id} not found");
    return user;
  
  }

  async update(id: number, updateUserDto: UpdateUserDto):Promise <User> {
    await this.userRepository.update(id,updateUserDto)
    return this.findOne(id);
    
  }

  async remove(id: number):Promise<void> {
    const result=await this.userRepository.delete(id);
    if (result.affected===0){
      throw new NotFoundException("user with ${id} not found ")
    }
  }
}
