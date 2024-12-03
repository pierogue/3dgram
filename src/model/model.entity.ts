import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { TelegramUser } from '../telegram-user/telegram-user.entity';
import { Format } from '../format/format.entity';
import { Category } from '../category/category.entity';
import { Like } from '../like/like.entity';

@Entity()
export class Model {
  @PrimaryGeneratedColumn()
  modelID: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('bytea') // Storing binary data for models
  modelBinary: Buffer;

  @ManyToOne(() => Format, (format) => format.formatID)
  modelFormat: Format;

  @ManyToOne(() => Category, (category) => category.categoryID)
  category: Category;

  @ManyToOne(() => TelegramUser, (user) => user.userId)
  owner: TelegramUser;

  @ManyToMany(() => Like)
  @JoinTable()
  likes: Like[]
}