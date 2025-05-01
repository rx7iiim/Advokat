import { Module } from '@nestjs/common';
import { FileService } from 'src/file/file.service';
import { FileController } from 'src/file/file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from 'src/file/entities/file.entity';
import { DriveModule } from 'src/drive/drive.module';
import { User } from 'src/user/entities/user.entity';
@Module({
  imports:[TypeOrmModule.forFeature([File]),DriveModule, TypeOrmModule.forFeature([User]),],
  controllers: [FileController],
  providers: [FileService],
  exports:[FileService]
})
export class FileModule {}
