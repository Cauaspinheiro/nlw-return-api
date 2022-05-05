import { BadRequestException, Injectable } from '@nestjs/common'
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
    this.validateType(data.type)
    this.validateComment(data.comment)
    this.validateScreenshot(data.screenshot)

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

  private validateType(type: string) {
    if (!type?.trim()) {
      throw new BadRequestException('Type is required')
    }
  }

  private validateComment(comment: string) {
    if (!comment?.trim()) {
      throw new BadRequestException('Comment is required')
    }
  }

  private validateScreenshot(screenshot: string | null) {
    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new BadRequestException('Invalid screenshot format')
    }
  }
}
