import { IOrder } from '@common/interfaces';
import { useCancelOrder, useCompleteOrder } from '@query';
import { Button } from '@ui/controls';
import { OrderStatus } from '../OrderStatus';
import styles from './OrderView.module.scss';

export interface OrderViewProps {
  order: IOrder;
  onSuccess?: () => void;
}

export const OrderView = ({ order, onSuccess }: OrderViewProps) => {
  const { cancelOrder } = useCancelOrder(onSuccess);
  const { completeOrder } = useCompleteOrder(onSuccess);

  const cancelAction = () => cancelOrder(order.id as number);
  const completeAction = () => completeOrder(order.id as number);

  return (
    <div className={styles['container']}>
      <OrderStatus order={order} />
      <h3>Товары:</h3>
      <ul className={styles['items']}>
        {order.items.map(({ product, quantity }, index) => (
          <li key={index}>
            <span>{product.displayName}</span>
            <span>Кол-во: {quantity}</span>
          </li>
        ))}
      </ul>
      {order.status === 'pending' && (
        <div className={styles['actions']}>
          <Button onClick={completeAction}>Завершить</Button>
          <Button styleType="alt" onClick={cancelAction}>
            Отменить
          </Button>
        </div>
      )}
    </div>
  );
};
