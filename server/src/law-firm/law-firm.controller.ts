import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LawFirmService } from './law-firm.service';
import { CreateLawFirmDto } from './dto/create-law-firm.dto';
import { UpdateLawFirmDto } from './dto/update-law-firm.dto';
@Controller('law-firm')
export class LawFirmController {
  constructor(private readonly lawFirmService: LawFirmService) {}

  @Post("sign up")
  create(@Body() createLawFirmDto: CreateLawFirmDto) {
    return this.lawFirmService.create(createLawFirmDto);
  }

  @Get()
  findAll() {
    return this.lawFirmService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lawFirmService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLawFirmDto: UpdateLawFirmDto) {
    return this.lawFirmService.update(+id, updateLawFirmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lawFirmService.remove(+id);
  }
}
