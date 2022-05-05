import { Body, Controller, Post } from '@nestjs/common'
import { CreateFeedbackDto } from './dtos/create-feedback.dto'
import { FeedbacksService } from './feedbacks.service'

@Controller('feedbacks')
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) {}

  @Post()
  async create(@Body() data: CreateFeedbackDto) {
    return await this.feedbacksService.create(data)
  }
}
