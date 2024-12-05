import { TelegramUser } from 'src/telegram-user/telegram-user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from 'typeorm';

@Unique(["roleName"])
@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  roleID: number;

  @Column()
  roleName: string;

  @OneToMany(() => TelegramUser, (user) => user.role)
  users: TelegramUser[];
}