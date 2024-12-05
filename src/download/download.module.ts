import { Module } from '@nestjs/common';
import { DownloadController } from './download.controller';
import { DownloadService } from './download.service';
import { downloadProviders } from './download.providers';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from 'src/telegram-user/telegram-user.providers';
import { modelProviders } from 'src/model/model.providers';

@Module({
  controllers: [DownloadController],
  providers: [
    ...downloadProviders,
    ...userProviders,
    ...modelProviders,
    DownloadService
  ],
  imports: [
    DatabaseModule
  ]
})
export class DownloadModule {}
