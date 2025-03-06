import { Module } from '@nestjs/common';
import { LawyerService } from './lawyer.service';
import { LawyerController } from './lawyer.controller';
import { Lawyer } from './entities/lawyer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Lawyer])],
  controllers: [LawyerController],
  providers: [LawyerService],
})
export class LawyerModule {}
