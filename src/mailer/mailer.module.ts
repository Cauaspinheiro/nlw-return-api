import { Module } from '@nestjs/common'
import { NodemailerService } from './impl/nodemailer.service'
import { MailerService } from './mailer.service'

@Module({
  providers: [{ provide: MailerService, useClass: NodemailerService }],
  exports: [MailerService],
})
export class MailerModule {}
