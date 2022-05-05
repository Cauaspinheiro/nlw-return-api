import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'

@Injectable()
export class MailerService implements OnModuleDestroy, OnModuleInit {
  private MAIL_NAME = 'Equipe Feedget'
  private MAIL_ADDRESS = 'oi@feedget.com'

  private transporter: Mail

  onModuleInit() {
    this.transporter = nodemailer.createTransport({
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      port: Number(process.env.SMTP_PORT),
      host: process.env.SMTP_HOST,
    })
  }

  onModuleDestroy() {
    this.transporter.close()
  }

  async send(to: string, html: string, subject: string) {
    return await this.transporter.sendMail({
      from: { address: this.MAIL_ADDRESS, name: this.MAIL_NAME },
      to,
      subject,
      html,
    })
  }
}
