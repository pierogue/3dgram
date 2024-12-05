import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Format } from './format.entity';

@Injectable()
export class FormatService {
  constructor(
    @Inject('FORMAT_REPOSITORY')
    private readonly formatRepository: Repository<Format>,
  ) {}

  // Fetch all formats
  async findAll(): Promise<Format[]> {
    return await this.formatRepository.find();
  }

  // Find a specific format by ID
  async findOne(id: number): Promise<Format> {
    const format = await this.formatRepository.findOne({ where: { formatID: id } });
    if (!format) {
      throw new NotFoundException(`Format with ID ${id} not found`);
    }
    return format;
  }

  // Create a new format
  async create(name: string): Promise<Format> {
    const format = this.formatRepository.create({ extension: name });
    return await this.formatRepository.save(format);
  }

  // Update an existing format
  async update(id: number, name: string): Promise<Format> {
    const format = await this.findOne(id);
    format.extension = name;
    return await this.formatRepository.save(format);
  }

  // Delete a format by ID
  async remove(id: number): Promise<void> {
    const format = await this.findOne(id);
    await this.formatRepository.remove(format);
  }
}
