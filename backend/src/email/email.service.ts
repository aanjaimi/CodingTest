import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'ayoub.anjaimi99@gmail.com',
        pass: 'kpnglmuefuxsjloe',
      },
    });
  }

  async sendMail(options: nodemailer.SendMailOptions): Promise<void> {
    await this.transporter.sendMail(options);
  }
}

// kpng lmue fuxs jloe
