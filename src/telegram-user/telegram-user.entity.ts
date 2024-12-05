import { Entity, Column, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Role } from '../role/role.entity';
import { Model } from 'src/model/model.entity';
import { Download } from 'src/download/download.entity';
import { Like } from '../like/like.entity';

@Entity()
export class TelegramUser {
  @PrimaryColumn()
  userId: string;

  @Column()
  name: string;

  @Column({ default: false })
  blocked: boolean;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @OneToMany(() => Model, (model) => model.owner)
  models: Model[]

  @OneToMany(() => Download, (download) => download.user)
  downloads: Download[]

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[]
}
