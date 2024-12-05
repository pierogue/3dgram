import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private readonly categoryRepository: Repository<Category>,
  ) {}

  // Create a new category
  async createCategory(name: string): Promise<Category> {
    const newCategory = this.categoryRepository.create({ categoryName: name });
    return await this.categoryRepository.save(newCategory);
  }

  // Get all categories
  async getAllCategories(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  // Get a single category by ID
  async getCategoryById(id: number): Promise<Category | null> {
    return await this.categoryRepository.findOne({ where: { categoryID: id } });
  }

  // Update a category
  async updateCategory(id: number, name?: string): Promise<Category | null> {
    const category = await this.getCategoryById(id);
    if (!category) {
      return null;
    }
    if (name) {
      category.categoryName = name;
    }
    return await this.categoryRepository.save(category);
  }

  // Delete a category
  async deleteCategory(id: number): Promise<boolean> {
    const result = await this.categoryRepository.delete(id);
    return result.affected > 0;
  }
}
