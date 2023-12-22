import { IBasket, IBasketItem } from '@common/interfaces';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BasketItem } from './basket-item.entity';

@Entity()
export class Basket implements IBasket {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => BasketItem, (item) => item.basket, { eager: true })
  items: IBasketItem[];
}
