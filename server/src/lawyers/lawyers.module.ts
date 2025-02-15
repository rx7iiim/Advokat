import { Module } from '@nestjs/common';
import { LawyersService } from './lawyers.service';
import { LawyersController } from './lawyers.controller';

@Module({
  controllers: [LawyersController],
  providers: [LawyersService],
})
export class LawyersModule {}
