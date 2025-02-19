import { Module } from '@nestjs/common';
import { LawFirmService } from './law-firm.service';
import { LawFirmController } from './law-firm.controller';

@Module({
  controllers: [LawFirmController],
  providers: [LawFirmService],
})
export class LawFirmModule {}
