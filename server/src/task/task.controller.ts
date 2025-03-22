import { Controller, Get, Post, Body, Delete, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(createTaskDto.description,createTaskDto.username);
  }

  @Get()
  findTasks(@Query ('username') username:string) {
    return this.taskService.getuserTasks(username);
  }


  @Delete()
  remove(@Query('id') id: number) {
    return this.taskService.deleteTask(id);
  }
}
