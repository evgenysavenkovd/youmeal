import { Product } from '@api/products';
import {
  type IOrder,
  type IOrderItem,
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
import { Order } from './order.entity';

@Entity()
export class OrderItem implements IOrderItem {
  @PrimaryColumn()
  orderId: number;

  @PrimaryColumn()
  productId: number;

  @OneToOne(() => Product, { eager: true })
  @JoinColumn({ name: 'productId' })
  product: IProduct;

  @ManyToOne(() => Order, (order) => order.items)
  @JoinColumn({ name: 'orderId' })
  order: IOrder;

  @Column()
  quantity: number;
}
