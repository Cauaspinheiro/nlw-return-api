import { Injectable } from '@nestjs/common'
import { MailerService } from 'src/mailer/mailer.service'
import { FeedbacksRepository } from '../repositories/feedbacks.repository'
import { SubmitFeedbackDto } from './dtos/submit-feedback.dto'

@Injectable()
export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailerService: MailerService,
  ) {}

  async run(data: SubmitFeedbackDto) {
    await this.feedbacksRepository.create({
      comment: data.comment,
      screenshot: data.screenshot,
      type: data.type,
    })

    await this.mailerService.send({
      to: 'Cauã Pinheiro <cauaspinheiro@gmail.com>',
      body: `<p>${data.comment}</p>\n<p>${data.type}</p>`,
      subject: 'Novo feedback',
    })
  }
}
