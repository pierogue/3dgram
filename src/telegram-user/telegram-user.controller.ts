import { 
  Controller, 
  Get, 
  Post, 
  Patch, 
  Delete, 
  Param, 
  Body, 
  HttpException, 
  HttpStatus, 
  Inject
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { TelegramUserService } from './telegram-user.service';
import { TelegramUser } from './telegram-user.entity';
import { Role } from '../role/role.entity';
import { Repository } from 'typeorm';

@Controller('users')
export class TelegramUserController {
  constructor(
    private readonly TelegramUserService: TelegramUserService,

    @Inject('ROLE_REPOSITORY')
    private readonly rolesRepository: Repository<Role>,
  ) {}

  /**
   * Create or update a user
   * @param body - User details: userId, name, and roleId
   */
  @Post()
  async createUser(
    @Body() body: { userId: string; name: string; roleId: number },
  ): Promise<TelegramUser> {
    try {
      const role = await this.rolesRepository.findOne({ where: { roleID: body.roleId } });

      return await this.TelegramUserService.createUser(body.userId, body.name, role);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Get all users
   */
  @Get()
  async findAllUsers(): Promise<TelegramUser[]> {
    try {
      return await this.TelegramUserService.findAllUsers();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Get a user by ID
   * @param userId - User ID to fetch
   */
  @Get(':userId')
  async findUserById(@Param('userId') userId: string): Promise<TelegramUser> {
    const user = await this.TelegramUserService.findUserById(userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  /**
   * Block or unblock a user
   * @param userId - User ID to block/unblock
   * @param body - Block status
   */
  @Patch('block/:userId')
  async toggleBlockUser(
    @Param('userId') userId: string,
    @Body() body: { block: boolean },
  ): Promise<TelegramUser> {
    try {
      return await this.TelegramUserService.toggleBlockUser(userId, body.block);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Assign a role to a user
   * @param userId - User ID
   * @param body - New roleId
   */
  @Patch('role/:userId')
  async assignRoleToUser(
    @Param('userId') userId: string,
    @Body() body: { roleId: number },
  ): Promise<TelegramUser> {
    try {
      return await this.TelegramUserService.assignRoleToUser(userId, body.roleId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Delete a user
   * @param userId - User ID to delete
   */
  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string): Promise<void> {
    try {
      await this.TelegramUserService.deleteUser(userId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
