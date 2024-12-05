import { Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { likeProviders } from './like.providers';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from 'src/telegram-user/telegram-user.providers';
import { modelProviders } from 'src/model/model.providers';

@Module({
  controllers: [LikeController],
  providers: [
    ...likeProviders,
    ...userProviders,
    ...modelProviders,
    LikeService
  ],
  imports: [
    DatabaseModule
  ]
})
export class LikeModule {}
