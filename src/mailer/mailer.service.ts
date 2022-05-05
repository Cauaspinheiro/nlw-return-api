import { SendMailDto } from './dtos/send-mail.dto'

export class MailerService {
  send: (data: SendMailDto) => Promise<void>
}
