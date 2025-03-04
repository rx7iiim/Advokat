import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: "advocatdev@gmail.com",
      pass: process.env.EMAIL_PASSWORD, 
    },
  });

  async sendConfirmationEmail(email: string, confirmationCode: string) {
    await this.transporter.sendMail({
      from: '"Advocat" <advocatdev@gmail.com>',
      to: email,
      subject: 'Email Confirmation Code',
      text: `Your confirmation code is: ${confirmationCode}`,
    });
  }
}
