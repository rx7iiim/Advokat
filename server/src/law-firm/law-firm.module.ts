import { Module } from '@nestjs/common';
import { LawFirmService } from './law-firm.service';
import { LawFirmController } from './law-firm.controller';
import { LawFirm } from './entities/law-firm.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([LawFirm])],
  controllers: [LawFirmController],
  providers: [LawFirmService],
})
export class LawFirmModule {}
