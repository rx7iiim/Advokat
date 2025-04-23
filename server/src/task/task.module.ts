import { forwardRef, Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { UserModule } from 'src/user/user.module';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports:[forwardRef(() =>UserModule ),
      TypeOrmModule.forFeature([Task]),
      TypeOrmModule.forFeature([User]),
      
      ],
  controllers: [TaskController,],
  providers: [TaskService],
  exports:[TaskService],
})
export class TaskModule {}
