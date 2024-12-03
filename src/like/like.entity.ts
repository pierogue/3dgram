import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { TelegramUser } from '../telegram-user/telegram-user.entity';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  likeID: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @OneToOne(() => TelegramUser, (user) => user.userId)
  owner: TelegramUser;
}