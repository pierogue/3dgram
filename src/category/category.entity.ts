import { Model } from '../model/model.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  categoryID: number;

  @Column()
  categoryName: string;

  @OneToMany(() => Model, (model) => model.category)
  models: Model[];
}