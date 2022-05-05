import { Module } from '@nestjs/common'
import { FeedbacksModule } from './feedbacks/feedbacks.module'
import { SharedModule } from './shared/shared.module'
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [FeedbacksModule, SharedModule, MailerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
