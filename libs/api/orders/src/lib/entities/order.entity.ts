import {
  type IOrder,
  type IOrderAddress,
  type IOrderItem
} from '@common/interfaces';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderItem } from './order-item.entity';

@Entity()
export class Order implements IOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => OrderItem, (item) => item.order, { eager: true })
  items: IOrderItem[];

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  deliveryType: 'pickup' | 'delivery';

  @Column('jsonb', { nullable: true })
  address?: IOrderAddress;

  @Column({ enum: ['pending', 'completed', 'canceled'], default: 'pending' })
  status: 'pending' | 'completed' | 'canceled';
}
