import { Module } from '@nestjs/common';
import { TelegramUserController } from './telegram-user.controller';
import { TelegramUserService } from './telegram-user.service';

@Module({
  controllers: [TelegramUserController],
  providers: [TelegramUserService]
})
export class TelegramUserModule {}
