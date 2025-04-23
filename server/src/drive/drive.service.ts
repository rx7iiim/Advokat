import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { Readable } from 'stream';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class GoogleDriveService {
  private drive;

  constructor() {
    const auth = new google.auth.GoogleAuth({
      keyFile: "src/upheld-beach-436122-t6-39881771156f.json",
      scopes: ['https://www.googleapis.com/auth/drive'],
    });

    this.drive = google.drive({ version: 'v3', auth });
  }

  async uploadFile(file: Express.Multer.File, folderId: string) {
    const fileMetaData = {
      name: file.originalname,
      parents: [folderId],
    };

    const media = {
      mimeType: file.mimetype,
      body: Readable.from(file.buffer),
    };

    const response = await this.drive.files.create({
      requestBody: fileMetaData,
      media: media,
      fields: 'id, webViewLink, webContentLink',
    });

    return response.data;
  }
}
