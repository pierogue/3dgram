import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Download } from './download.entity';
import { TelegramUser } from '../telegram-user/telegram-user.entity';
import { Model } from '../model/model.entity';

@Injectable()
export class DownloadService {
  constructor(
    @Inject('DOWNLOAD_REPOSITORY')
    private readonly downloadRepository: Repository<Download>,
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<TelegramUser>,
    @Inject('MODEL_REPOSITORY')
    private readonly modelRepository: Repository<Model>,
  ) {}

  // Get all downloads
  async findAll(): Promise<Download[]> {
    return await this.downloadRepository.find();
  }

  // Get a specific download by ID
  async findOne(id: number): Promise<Download> {
    const download = await this.downloadRepository.findOne({ where: { downloadID: id } });
    if (!download) {
      throw new NotFoundException(`Download with ID ${id} not found`);
    }
    return download;
  }

  // Create a new download record
  async create(userId: string, modelId: number): Promise<Download> {
    const user = await this.userRepository.findOne({ where: { userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const model = await this.modelRepository.findOne({ where: { modelID: modelId } });
    if (!model) {
      throw new NotFoundException(`Model with ID ${modelId} not found`);
    }

    const download = this.downloadRepository.create({ user, model });
    return await this.downloadRepository.save(download);
  }

  // Delete a download record
  async remove(id: number): Promise<void> {
    const download = await this.findOne(id);
    await this.downloadRepository.remove(download);
  }
}
