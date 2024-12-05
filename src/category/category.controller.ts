import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // Create a new category
  @Post()
  async createCategory(@Body() createCategoryDto: { name: string }): Promise<Category> {
    if (!createCategoryDto.name) {
      throw new HttpException('Category name is required', HttpStatus.BAD_REQUEST);
    }
    return await this.categoryService.createCategory(createCategoryDto.name);
  }

  // Get all categories
  @Get()
  async getAllCategories(): Promise<Category[]> {
    return await this.categoryService.getAllCategories();
  }

  // Get a single category by ID
  @Get(':id')
  async getCategoryById(@Param('id') id: number): Promise<Category> {
    const category = await this.categoryService.getCategoryById(id);
    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    return category;
  }

  // Update a category
  @Patch(':id')
  async updateCategory(
    @Param('id') id: number,
    @Body() updateCategoryDto: { name?: string },
  ): Promise<Category> {
    const updatedCategory = await this.categoryService.updateCategory(id, updateCategoryDto.name);
    if (!updatedCategory) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    return updatedCategory;
  }

  // Delete a category
  @Delete(':id')
  async deleteCategory(@Param('id') id: number): Promise<void> {
    const result = await this.categoryService.deleteCategory(id);
    if (!result) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
  }
}
