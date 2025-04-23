import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter;
  constructor(private configService: ConfigService,) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // Change for other providers (e.g., Outlook, Yahoo)
      port: 587, // 465 for SSL, 587 for TLS
      secure: false, // Set to true for SSL
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
    });

    // Check transporter connection
    this.transporter.verify((error, success) => {
      if (error) {
        this.logger.error(`Transporter Error: ${error.message}`);
      } else {
        this.logger.log('Mailer is ready to send emails');
      }
    });
  }

  async sendVerificationEmail(email: string, code: string) {
    try {
      const info = await this.transporter.sendMail({
        from: `"Support Team" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Email Verification Code',
        text: `Your verification code is: ${code}`,
      });
      this.logger.log('${process.env.EMAIL_USER}  ${process.env.EMAIL_PASS}')
      this.logger.log(`Email sent: ${info.messageId}`);
    } catch (error) {
      this.logger.error(`Email sending failed: ${error.message}`);
    }
  }
}
