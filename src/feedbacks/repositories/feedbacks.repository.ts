import { CreateFeedbackDto } from './dtos/create-feedback.dto'

export class FeedbacksRepository {
  create: (data: CreateFeedbackDto) => Promise<void>
}
