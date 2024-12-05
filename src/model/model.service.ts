import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Model } from './model.entity';
import { TelegramUser } from '../telegram-user/telegram-user.entity';  // Import TelegramUser
import { Download } from '../download/download.entity';  // Import Download entity
import { Format } from 'src/format/format.entity';
import { Category } from 'src/category/category.entity';

@Injectable()
export class ModelService {
  constructor(
    @Inject('MODEL_REPOSITORY')
    private readonly modelRepository: Repository<Model>,

    @Inject('USER_REPOSITORY')
    private readonly telegramUserRepository: Repository<TelegramUser>, 

    @Inject('CATEGORY_REPOSITORY')
    private readonly categoryRepository: Repository<Category>
  ) {}

  async createModel(createModelDto: { title: string, description: string, owner: TelegramUser, format: Format, binary: Buffer, category: Category }): Promise<Model> {

    const model = this.modelRepository.create({
      category: createModelDto.category,
      modelBinary: createModelDto.binary,
      format: createModelDto.format,
      title: createModelDto.title,
      description: createModelDto.description,
      owner: createModelDto.owner, 
    });

    return await this.modelRepository.save(model);
  }

  // Get all models
  async getAllModels(): Promise<Model[]> {
    return this.modelRepository.find({
      relations: ['owner', 'downloads', 'likes'], 
    });
  }

  // Get a specific model by ID
  async getModelById(modelID: number): Promise<Model> {
    const model = await this.modelRepository.findOne({
      where: { modelID },
      relations: ['owner', 'downloads'],
    });

    if (!model) {
      throw new NotFoundException(`Model with ID ${modelID} not found`);
    }

    return model;
  }

  // Update a model
  async updateModel(model: Model, updateModelDto: { title: string, description: string }): Promise<Model> {

    model.title = updateModelDto.title;
    model.description = updateModelDto.description;

    return await this.modelRepository.save(model);
  }

  // Delete a model
  async deleteModel(model: Model): Promise<void> {

    await this.modelRepository.remove(model);
  }
}
