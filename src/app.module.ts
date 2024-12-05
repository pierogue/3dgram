import { Module } from '@nestjs/common';
import { TelegramUserModule } from './telegram-user/telegram-user.module';
import { DatabaseModule } from './database/database.module';
import { ModelModule } from './model/model.module';
import { FormatModule } from './format/format.module';
import { CategoryModule } from './category/category.module';
import { DownloadModule } from './download/download.module';
import { LikeModule } from './like/like.module';
import { TelegramBotModule } from './telegram-bot/telegram-bot.module';
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    DatabaseModule,
    TelegramUserModule,
    ModelModule,
    FormatModule,
    CategoryModule,
    DownloadModule,
    LikeModule,
    TelegramBotModule,
    ConfigModule.forRoot({
      envFilePath:'.env'
    })
  ],
})
export class AppModule {}
