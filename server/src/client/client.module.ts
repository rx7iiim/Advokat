import { forwardRef, Module } from '@nestjs/common';
import { ClientService } from 'src/client/client.service';
import { ClientController } from 'src/client/client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/client/entities/client.entity';
import { User } from 'src/user/entities/user.entity';
import { DriveModule } from 'src/drive/drive.module';

@Module({
  imports: [forwardRef(()=>ClientModule), 
    TypeOrmModule.forFeature([Client]),
  TypeOrmModule.forFeature([User]),DriveModule],
  controllers: [ClientController],
  providers: [ClientService],   
  exports:[ClientService]
})
export class ClientModule {}
