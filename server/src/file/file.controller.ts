import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Query, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { FileService } from 'src/file/file.service';
import { CreateFileDto } from 'src/file/dto/create-file.dto';
import { UpdateFileDto } from 'src/file/dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { GoogleDriveService } from 'src/drive/drive.service';
@Controller('file')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly googleDriveService:GoogleDriveService) {
    
  }

 @Post()
 @UseInterceptors(FileInterceptor('file'))
 async create(
 @Body() body:any,
 @Query('username') username:string,
 @UploadedFile(new ParseFilePipe({
   validators :[
     new MaxFileSizeValidator({maxSize:100000000}),
     new FileTypeValidator({fileType:'application/pdf'}),
   ],
 }),
 ) file :Express.Multer.File,
 )
  {
   
   console.log(file);
   const folderId="1DGOYFqUIa_iSn52T_Ss0FktdQoMdbNnU"
   const uploadFile=await this.googleDriveService.uploadFile(file ,folderId);
   console.log(uploadFile)
 
  return this.fileService.createFile(file,username,uploadFile.id);
   }

  @Get()
  findAll(@Query('username' )username:string ) {
    return this.fileService.findAll(username);
  }   

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.fileService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileService.remove(+id);
  }
}
