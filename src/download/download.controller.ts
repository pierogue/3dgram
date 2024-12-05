import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { DownloadService } from './download.service';

@Controller('downloads')
export class DownloadController {
  constructor(private readonly downloadService: DownloadService) {}

  // Get all downloads
  @Get()
  async findAll() {
    return await this.downloadService.findAll();
  }

  // Get a single download by ID
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.downloadService.findOne(id);
  }

  // Create a new download record
  @Post()
  async create(@Body('userId') userId: string, @Body('modelId') modelId: number) {
    return await this.downloadService.create(userId, modelId);
  }

  // Delete a download record
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.downloadService.remove(id);
  }
}
