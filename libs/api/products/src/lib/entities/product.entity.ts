import { Category } from '@api/categories';
import { IProduct } from '@common/interfaces';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class Product implements IProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  displayName: string;

  @Column()
  description: string;

  @Column('text', { array: true })
  compound: string[];

  @Column()
  weight: number;

  @Column()
  calorieValue: number;

  @Column()
  imageUrl: string;

  @Column()
  price: number;

  @ManyToOne(() => Category)
  @JoinColumn()
  category: number;
}
