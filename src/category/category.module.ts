import { Module } from '@nestjs/common';
import { categoryProviders } from './category.providers';
import { DatabaseModule } from 'src/database/database.module';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { modelProviders } from 'src/model/model.providers';

@Module({
  providers:[
    ...categoryProviders,
    ...modelProviders,
    CategoryService
  ],
  imports: [
    DatabaseModule
  ],
  controllers: [CategoryController]
})
export class CategoryModule {}
