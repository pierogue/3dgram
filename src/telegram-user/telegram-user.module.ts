import { Module } from '@nestjs/common';
import { TelegramUserController } from './telegram-user.controller';
import { TelegramUserService } from './telegram-user.service';
import { userProviders } from './telegram-user.providers';
import { DatabaseModule } from 'src/database/database.module';
import { roleProviders } from 'src/role/role.providers';

@Module({
  controllers: [
    TelegramUserController
  ],
  providers: [
    ...userProviders,
    ...roleProviders,
    TelegramUserService
  ],
  imports: [
    DatabaseModule,
  ]
})
export class TelegramUserModule {}
