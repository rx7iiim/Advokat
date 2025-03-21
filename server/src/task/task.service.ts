import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { EmailService } from 'src/email/email.service';
import { Task } from './entities/task.entity'; 

@Injectable()
export class TaskService {
   constructor(
          @InjectRepository(Task) private taskRepository: Repository<Task>,
          @InjectRepository(User) private userRepository: Repository<User>,
          @Inject(forwardRef(() => UserService))
          private readonly userService:UserService,
      ){}



  async createTask(description: string, username:string): Promise<Task> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) throw new Error('Lawyer not found');

    const task = this.taskRepository.create(
      { description,
        user,
        start_time:new Date(Date.now())});
    return this.taskRepository.save(task);
  }


  async getuserTasks(username:string): Promise<Task[]> {
    return this.taskRepository.find({
      where: { user: {username } },
      relations: ['user'],
    });
  }




  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
}
}