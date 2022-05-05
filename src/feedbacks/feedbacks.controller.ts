import { Body, Controller, Post } from '@nestjs/common'
import { FeedbacksService } from './feedbacks.service'
import { PostFeedbackRequestDto } from './requests/post-feedbacks-request.dto'

@Controller('feedbacks')
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) {}

  @Post()
  async create(@Body() data: PostFeedbackRequestDto) {
    return await this.feedbacksService.create(data)
  }
}
