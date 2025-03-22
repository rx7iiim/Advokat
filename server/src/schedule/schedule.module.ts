import { Module } from '@nestjs/common';
import { ScheduleService } from 'src/schedule/schedule.service';
import { ScheduleController } from 'src/schedule/schedule.controller';
import { Schedule } from 'src/schedule/entities/schedule.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports:[TypeOrmModule.forFeature([Schedule])],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
