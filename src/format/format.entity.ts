import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Format {
  @PrimaryGeneratedColumn()
  formatID: number;

  @Column()
  extension: string;
}