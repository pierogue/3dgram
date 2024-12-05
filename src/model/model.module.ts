import { Module } from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelController } from './model.controller';
import { modelProviders } from './model.providers';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from 'src/telegram-user/telegram-user.providers';
import { formatProviders } from 'src/format/format.providers';
import { categoryProviders } from 'src/category/category.providers';

@Module({
  providers: [
    ...modelProviders,
    ...userProviders,
    ...formatProviders,
    ...categoryProviders,
    ModelService
  ],
  controllers: [ModelController],
  imports: [
    DatabaseModule
  ]
})
export class ModelModule {}
