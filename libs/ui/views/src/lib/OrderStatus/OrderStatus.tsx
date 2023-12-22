import { IOrder } from '@common/interfaces';
import styles from './OrderStatus.module.scss';

export interface OrderStatusProps {
  order: IOrder;
}

export const OrderStatus = ({ order }: OrderStatusProps) => (
  <div className={styles['badge']}>
    <span data-status="completed" data-active={order.status === 'completed'}>
      Завершён
    </span>
    <span data-status="pending" data-active={order.status === 'pending'}>
      Ожидает
    </span>
    <span data-status="canceled" data-active={order.status === 'canceled'}>
      Отменён
    </span>
  </div>
);
