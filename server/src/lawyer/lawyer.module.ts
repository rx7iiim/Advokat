import { Module } from '@nestjs/common';
import { LawyerService } from './lawyer.service';
import { LawyerController } from './lawyer.controller';

@Module({
  controllers: [LawyerController],
  providers: [LawyerService],
})
export class LawyerModule {}
