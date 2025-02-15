import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LawyersService } from './lawyers.service';
import { CreateLawyerDto } from './dto/create-lawyer.dto';
import { UpdateLawyerDto } from './dto/update-lawyer.dto';

@Controller('lawyers')
export class LawyersController {
  constructor(private readonly lawyersService: LawyersService) {}

  @Post()
  create(@Body() createLawyerDto: CreateLawyerDto) {
    return this.lawyersService.create(createLawyerDto);
  }

  @Get()
  findAll() {
    return this.lawyersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lawyersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLawyerDto: UpdateLawyerDto) {
    return this.lawyersService.update(+id, updateLawyerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lawyersService.remove(+id);
  }
}
