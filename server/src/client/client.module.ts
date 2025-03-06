import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [ClientController],
  providers: [ClientService],
  exports:[ClientService]
})
export class ClientModule {}
