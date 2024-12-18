import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TelegramUser } from '../telegram-user/telegram-user.entity';
import { Model } from 'src/model/model.entity';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  likeID: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @ManyToOne(() => TelegramUser, (user) => user.likes)
  user: TelegramUser;

  @ManyToOne(() => Model, (model) => model.likes)
  model: Model;
}