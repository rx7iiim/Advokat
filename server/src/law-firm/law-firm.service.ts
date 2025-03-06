import { Injectable } from '@nestjs/common';
import { CreateLawFirmDto } from './dto/create-law-firm.dto';
import { UpdateLawFirmDto } from './dto/update-law-firm.dto';

@Injectable()
export class LawFirmService {
  create(createLawFirmDto: CreateLawFirmDto) {
    return 'This action adds a new lawFirm';
  }

  findAll() {
    return `This action returns all lawFirm`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lawFirm`;
  }

  update(id: number, updateLawFirmDto: UpdateLawFirmDto) {
    return `This action updates a #${id} lawFirm`;
  }

  remove(id: number) {
    return `This action removes a #${id} lawFirm`;
  }
}
