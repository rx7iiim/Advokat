import { Injectable } from '@nestjs/common';
import { CreateLawyerDto } from './dto/create-lawyer.dto';
import { UpdateLawyerDto } from './dto/update-lawyer.dto';

@Injectable()
export class LawyerService {
  create(createLawyerDto: CreateLawyerDto) {
    return 'This action adds a new lawyer';
  }

  findAll() {
    return `This action returns all lawyer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lawyer`;
  }

  update(id: number, updateLawyerDto: UpdateLawyerDto) {
    return `This action updates a #${id} lawyer`;
  }

  remove(id: number) {
    return `This action removes a #${id} lawyer`;
  }
}
