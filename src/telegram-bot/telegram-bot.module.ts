import { Module } from '@nestjs/common';
import { TelegramBotService } from './telegram-bot.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [TelegramBotService],
  imports: [ConfigModule]
})
export class TelegramBotModule {}
