import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { LikeService } from './like.service';

@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  // Get all likes
  @Get()
  async findAll() {
    return await this.likeService.findAll();
  }

  // Get likes for a specific model
  @Get('model/:modelId')
  async findByModel(@Param('modelId') modelId: number) {
    return await this.likeService.findByModel(modelId);
  }

  // Get likes by a specific user
  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string) {
    return await this.likeService.findByUser(userId);
  }

  // Add a like
  @Post()
  async create(@Body('userId') userId: string, @Body('modelId') modelId: number) {
    return await this.likeService.create(userId, modelId);
  }

  // Remove a like
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.likeService.remove(id);
  }
}
