import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { TelegramUser } from '../telegram-user/telegram-user.entity';
import { Format } from '../format/format.entity';
import { Category } from '../category/category.entity';
import { Like } from '../like/like.entity';
import { Download } from 'src/download/download.entity';

@Entity()
export class Model {
  @PrimaryGeneratedColumn()
  modelID: number;

  @Column()
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('bytea') // Storing binary data for models
  modelBinary: Buffer;

  @ManyToOne(() => Format, (format) => format.models)
  format: Format;

  @ManyToOne(() => Category, (category) => category.models)
  category: Category;

  @ManyToOne(() => TelegramUser, (user) => user.models)
  owner: TelegramUser;

  @OneToMany(() => Like, (like)=> like.model)
  likes: Like[]

  @OneToMany(() => Download, (download)=> download.model)
  downloads: Download[]
}