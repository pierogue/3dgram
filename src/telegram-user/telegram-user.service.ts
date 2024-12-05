import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TelegramUser } from './telegram-user.entity';
import { Role } from '../role/role.entity';

@Injectable()
export class TelegramUserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: Repository<TelegramUser>,

    @Inject('ROLE_REPOSITORY')
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  async createUser(userId: string, name: string, role: Role): Promise<TelegramUser> {
    const user = this.usersRepository.create({ userId, name, role });
    return this.usersRepository.save(user);
  }

  async findAllUsers(): Promise<TelegramUser[]> {
    return this.usersRepository.find({ relations: ['role'] });
  }

  async findUserById(userId: string): Promise<TelegramUser> {
    return this.usersRepository.findOne({
      where: { userId },
      relations: ['role', 'likes', 'downloads', 'models'],
    });
  }

  async findUserByName(name: string): Promise<TelegramUser> {
    return this.usersRepository.findOne({
      where: { name },
      relations: ['role', 'likes', 'downloads', 'models'],
    });
  }

  async assignRoleToUser(userId: string, roleId: number): Promise<TelegramUser> {
    const user = await this.findUserById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const role = await this.rolesRepository.findOne({ where: { roleID: roleId } });
    if (!role) {
      throw new Error(`Role with ID ${roleId} not found`);
    }

    user.role = role;
    return this.usersRepository.save(user);
  }

  async toggleBlockUser(userId: string, block: boolean): Promise<TelegramUser> {
    const user = await this.findUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.blocked = block;
    return this.usersRepository.save(user);
  }

  async deleteUser(userId: string): Promise<void> {
    await this.usersRepository.delete(userId);
  }
}
