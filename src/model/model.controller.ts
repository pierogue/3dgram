import { Controller, Post, Get, Patch, Param, Body, Delete, Inject, NotFoundException } from '@nestjs/common';
import { ModelService } from './model.service';
import { Model } from './model.entity';
import { TelegramUser } from 'src/telegram-user/telegram-user.entity';
import { Repository } from 'typeorm';
import { Format } from 'src/format/format.entity';
import { Category } from 'src/category/category.entity';

@Controller('models')
export class ModelController {
  constructor(
    private readonly modelService: ModelService,
    
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<TelegramUser>,

    @Inject('FORMAT_REPOSITORY')
    private readonly formatRepository: Repository<Format>,

    @Inject('CATEGORY_REPOSITORY')
    private readonly categoryRepository: Repository<Category>
  ) {}

  // Create a new model
  @Post()
  async createModel(@Body() ModelDto: { title: string, description: string, ownerId: string, formatId: number, categoryId: number, binary: Buffer }): Promise<Model> {

    const format = await this.formatRepository.findOne({where: {formatID: ModelDto.formatId}});
    const owner = await this.userRepository.findOne({where: {userId: ModelDto.ownerId}});
    const category = await this.categoryRepository.findOne({where: {categoryID: ModelDto.categoryId}});

    const createModelDto = {
      title: ModelDto.title,
      description: ModelDto.description,
      binary: ModelDto.binary,
      format,
      owner,
      category
    }

    return this.modelService.createModel(createModelDto);
  }

  // Get all models
  @Get()
  async getAllModels(): Promise<Model[]> {
    return this.modelService.getAllModels();
  }

  // Get a specific model by ID
  @Get(':id')
  async getModelById(@Param('id') modelID: number): Promise<Model> {
    return this.modelService.getModelById(modelID);
  }

  // Update a model
  @Patch(':id')
  async updateModel(@Param('id') modelID: number, @Body() updateModelDto: { title: string, description: string }): Promise<Model> {
    const model = await this.modelService.getModelById(modelID);
    if (!model) {
      throw new NotFoundException(`Model with ID ${modelID} not found`);
    }
    return this.modelService.updateModel(model, updateModelDto);
  }

  // Delete a model
  @Delete(':id')
  async deleteModel(@Param('id') modelID: number): Promise<void> {
    const model = await this.modelService.getModelById(modelID);
    if (!model) {
      throw new NotFoundException(`Model with ID ${modelID} not found`);
    }
    return this.modelService.deleteModel(model);
  }
}
