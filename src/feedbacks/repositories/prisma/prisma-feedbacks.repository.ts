import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/prisma.service'
import { CreateFeedbackDto } from '../dtos/create-feedback.dto'
import { FeedbacksRepository } from '../feedbacks.repository'

@Injectable()
export class PrismaFeedbacksRepository implements FeedbacksRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: CreateFeedbackDto) {
    await this.prismaService.feedback.create({ data })
  }
}
