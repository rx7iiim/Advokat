import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import { env } from 'process';
dotenv.config();

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
      user: 'advocatdev@gmail.com',
      pass: process.env.EMAIL_PASSWORD,  
    },
  });

  async sendMail(to: string, subject: string, text: string) {
    await this.transporter.sendMail({
      from: '"Advocat" <advocatdev@gmail.com>',
      to,
      subject,
      text,
    });
  }
}
