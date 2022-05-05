import { Module } from '@nestjs/common'
import { FeedbacksService } from './feedbacks.service'
import { FeedbacksController } from './feedbacks.controller'
import { MailerModule } from 'src/mailer/mailer.module'

@Module({
  controllers: [FeedbacksController],
  providers: [FeedbacksService],
  imports: [MailerModule],
})
export class FeedbacksModule {}
