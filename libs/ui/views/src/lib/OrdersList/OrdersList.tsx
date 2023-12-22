'use client';

import { IOrder } from '@common/interfaces';
import { useGetOrders } from '@query';
import { AdminDrawerContext } from '@ui/common';
import { useContext } from 'react';
import { OrderStatus } from '../OrderStatus';
import { OrderView } from '../OrderView';
import styles from './OrdersList.module.scss';

export const OrdersList = () => {
  const { orders } = useGetOrders();

  const { setTitle, setContent, closeDrawer } = useContext(AdminDrawerContext);

  const onItemClick = (order: IOrder) => () => {
    setTitle(`Заказ №${order.id}`);
    setContent(<OrderView order={order} onSuccess={closeDrawer} />);
  };

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <div className={styles['id']}>ID</div>
        <div className={styles['count']}>Количество товаров</div>
        <div className={styles['phone']}>Телефон</div>
        <div className={styles['status']}>Статус</div>
      </div>
      {orders?.map((order) => (
        <div
          key={order.id}
          className={styles['item']}
          onClick={onItemClick(order)}
        >
          <div className={styles['id']}>{order.id}</div>
          <div className={styles['count']}>{order.items.length}</div>
          <div className={styles['phone']}>{order.phone}</div>
          <div className={styles['status']}>
            <OrderStatus order={order} />
          </div>
        </div>
      ))}
    </div>
  );
};
