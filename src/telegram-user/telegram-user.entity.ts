import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Role } from '../role/role.entity';
import { Model } from 'src/model/model.entity';

@Entity()
export class TelegramUser {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  nickname: string;

  @Column({ default: false })
  blocked: boolean;

  @ManyToOne(() => Role, (role) => role.roleID)
  role: Role;

  @OneToMany(() => Model, (model => model.modelID))
  models: Model[]
}
