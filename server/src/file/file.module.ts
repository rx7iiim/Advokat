import { Module } from '@nestjs/common';
import { FileService } from 'src/file/file.service';
import { FileController } from 'src/file/file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from 'src/file/entities/file.entity';
@Module({
  imports:[TypeOrmModule.forFeature([File])],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
