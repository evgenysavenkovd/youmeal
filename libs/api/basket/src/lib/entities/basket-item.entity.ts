import { Product } from '@api/products';
import {
  type IBasket,
  type IBasketItem,
  type IProduct
} from '@common/interfaces';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn
} from 'typeorm';
import { Basket } from './basket.entity';

@Entity()
export class BasketItem implements IBasketItem {
  @PrimaryColumn()
  productId: number;

  @PrimaryColumn()
  basketId: number;

  @OneToOne(() => Product, { eager: true })
  @JoinColumn({ name: 'productId' })
  product: IProduct;

  @ManyToOne(() => Basket, (basket) => basket.items)
  @JoinColumn({ name: 'basketId' })
  basket: IBasket;

  @Column()
  quantity: number;
}
