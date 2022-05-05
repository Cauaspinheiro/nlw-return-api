import { Module } from '@nestjs/common'
import { FeedbacksService } from './feedbacks.service'
import { FeedbacksController } from './feedbacks.controller'
import { MailerModule } from 'src/mailer/mailer.module'
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback.use-case'
import { FeedbacksRepository } from './repositories/feedbacks.repository'
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks.repository'

@Module({
  controllers: [FeedbacksController],
  providers: [
    FeedbacksService,
    SubmitFeedbackUseCase,
    {
      provide: FeedbacksRepository,
      useClass: PrismaFeedbacksRepository,
    },
  ],
  imports: [MailerModule],
})
export class FeedbacksModule {}
