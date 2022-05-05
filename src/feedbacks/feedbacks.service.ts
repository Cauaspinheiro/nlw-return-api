import { Injectable } from '@nestjs/common'
import { MailerService } from 'src/mailer/mailer.service'

import { PrismaService } from 'src/shared/prisma.service'
import { CreateFeedbackDto } from './dtos/create-feedback.dto'

@Injectable()
export class FeedbacksService {
  constructor(
    private prismaService: PrismaService,
    private mailerService: MailerService,
  ) {}

  async create(data: CreateFeedbackDto) {
    const feedback = await this.prismaService.feedback.create({
      data,
    })

    await this.mailerService.send(
      'Cauã Pinheiro <cauaspinheiro@gmail.com>',
      `<p>${data.comment}</p>`,
      'Novo feedback',
    )

    return feedback
  }
}
