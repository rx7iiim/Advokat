import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LawyerService } from './lawyer.service';
import { CreateLawyerDto } from './dto/create-lawyer.dto';
import { UpdateLawyerDto } from './dto/update-lawyer.dto';

@Controller('lawyer')
export class LawyerController {
  constructor(private readonly lawyerService: LawyerService) {}

  @Post()
  create(@Body() createLawyerDto: CreateLawyerDto) {
    return this.lawyerService.create(createLawyerDto);
  }

  @Get()
  findAll() {
    return this.lawyerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lawyerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLawyerDto: UpdateLawyerDto) {
    return this.lawyerService.update(+id, updateLawyerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lawyerService.remove(+id);
  }
}
