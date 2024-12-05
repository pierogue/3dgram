import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { TelegramUser } from '../telegram-user/telegram-user.entity';
import { Model } from 'src/model/model.entity';

@Entity()
export class Download {
  @PrimaryGeneratedColumn()
  downloadID: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @ManyToOne(() => TelegramUser, (user) => user.downloads)
  user: TelegramUser;
  
  @ManyToOne(() => Model, (model) => model.downloads)
  model: Model;
}