import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import Mail from 'nodemailer/lib/mailer'
import nodemailer from 'nodemailer'
import { MailerService } from '../mailer.service'
import { SendMailDto } from '../dtos/send-mail.dto'

@Injectable()
export class NodemailerService
  implements MailerService, OnModuleDestroy, OnModuleInit
{
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

  async send(data: SendMailDto) {
    return await this.transporter.sendMail({
      from: { address: this.MAIL_ADDRESS, name: this.MAIL_NAME },
      to: data.to,
      subject: data.subject,
      html: data.body,
    })
  }
}
