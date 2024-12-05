import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  /**
   * Create a new role
   * @param roleName - The name of the role
   */
  async createRole(roleName: string): Promise<Role> {
    const role = this.roleRepository.create({ roleName });
    return this.roleRepository.save(role);
  }

  /**
   * Find a role by its ID
   * @param roleId - Role ID
   */
  async findRoleById(roleId: number): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { roleID: roleId } });
    if (!role) {
      throw new Error(`Role with ID ${roleId} not found`);
    }
    return role;
  }

  /**
   * Find all roles
   */
  async findAllRoles(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  /**
   * Update a role's name
   * @param roleId - Role ID
   * @param roleName - New role name
   */
  async updateRole(roleId: number, roleName: string): Promise<Role> {
    const role = await this.findRoleById(roleId);
    if (!role) {
      throw new Error(`Role with ID ${roleId} not found`);
    }

    role.roleName = roleName;
    return this.roleRepository.save(role);
  }

  /**
   * Delete a role by its ID
   * @param roleId - Role ID
   */
  async deleteRole(roleId: number): Promise<void> {
    const role = await this.findRoleById(roleId);
    if (!role) {
      throw new Error(`Role with ID ${roleId} not found`);
    }

    await this.roleRepository.remove(role);
  }
}
