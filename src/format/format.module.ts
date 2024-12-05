import { Module } from '@nestjs/common';
import { formatProviders } from './format.providers';
import { DatabaseModule } from 'src/database/database.module';
import { FormatService } from './format.service';
import { FormatController } from './format.controller';

@Module({
  providers: [
    ...formatProviders,
    FormatService
  ],
  imports: [
    DatabaseModule
  ],
  controllers: [FormatController]
})
export class FormatModule {}
