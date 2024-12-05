import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { FormatService } from './format.service';

@Controller('formats')
export class FormatController {
  constructor(private readonly formatService: FormatService) {}

  // Get all formats
  @Get()
  async findAll() {
    return await this.formatService.findAll();
  }

  // Get a single format by ID
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.formatService.findOne(id);
  }

  // Create a new format
  @Post()
  async create(@Body('extension') extension: string) {
    return await this.formatService.create(extension);
  }

  // Update a format by ID
  @Patch(':id')
  async update(@Param('id') id: number, @Body('name') name: string) {
    return await this.formatService.update(id, name);
  }

  // Delete a format by ID
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.formatService.remove(id);
  }
}
