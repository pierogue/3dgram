import { Model } from 'src/model/model.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Format {
  @PrimaryGeneratedColumn()
  formatID: number;

  @Column()
  extension: string;

  @OneToMany(() => Model, (model) => model.format)
  models: Model[];
}