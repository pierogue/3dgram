import { Inject, Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './like.entity';
import { TelegramUser } from '../telegram-user/telegram-user.entity';
import { Model } from '../model/model.entity';

@Injectable()
export class LikeService {
  constructor(
    @Inject('LIKE_REPOSITORY')
    private readonly likeRepository: Repository<Like>,
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<TelegramUser>,
    @Inject('MODEL_REPOSITORY')
    private readonly modelRepository: Repository<Model>,
  ) {}

  // Get all likes
  async findAll(): Promise<Like[]> {
    return await this.likeRepository.find();
  }

  // Get likes for a specific model
  async findByModel(modelId: number): Promise<Like[]> {
    const model = await this.modelRepository.findOne({ where: { modelID: modelId } });
    if (!model) {
      throw new NotFoundException(`Model with ID ${modelId} not found`);
    }
    return await this.likeRepository.find({ where: { model } , relations: ['user']});
  }

  // Get likes by a specific user
  async findByUser(userId: string): Promise<Like[]> {
    const user = await this.userRepository.findOne({ where: { userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return await this.likeRepository.find({ where: { user }, relations: ['model']});
  }

  // Add a like
  async create(userId: string, modelId: number): Promise<Like> {
    const user = await this.userRepository.findOne({ where: { userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const model = await this.modelRepository.findOne({ where: { modelID: modelId } });
    if (!model) {
      throw new NotFoundException(`Model with ID ${modelId} not found`);
    }

    // Check if the user already liked the model
    const existingLike = await this.likeRepository.findOne({ where: { user, model } });
    if (existingLike) {
      throw new Error('User has already liked this model');
    }

    const like = this.likeRepository.create({ user, model });
    return await this.likeRepository.save(like);
  }

  // Remove a like
  async remove(id: number): Promise<void> {
    const like = await this.likeRepository.findOne({ where: { likeID: id } });
    if (!like) {
      throw new NotFoundException(`Like with ID ${id} not found`);
    }
    await this.likeRepository.remove(like);
  }
}
