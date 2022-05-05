import { Injectable } from '@nestjs/common'
import { PostFeedbackRequestDto } from './requests/post-feedbacks-request.dto'
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback.use-case'

@Injectable()
export class FeedbacksService {
  constructor(private submitFeedbackUseCase: SubmitFeedbackUseCase) {}

  async create(data: PostFeedbackRequestDto) {
    await this.submitFeedbackUseCase.run(data)
  }
}
