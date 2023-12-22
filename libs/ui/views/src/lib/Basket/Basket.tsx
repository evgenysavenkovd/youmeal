'use client';

import { UpdateBasketDto } from '@api/basket';
import { useGetBasket, useUpdateBasket } from '@query';
import { LoadingIndicator } from '@ui/common';
import { Box, pngIcons } from '@ui/common/server';
import { Button, QuantityInput } from '@ui/controls';
import { CreateOrderModal } from '@ui/modals';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { debounce } from 'throttle-debounce';
import { getItemsQuantity } from '../../utils';
import styles from './Basket.module.scss';

export const Basket = () => {
  const { basket, isFetching } = useGetBasket();

  const { updateBasket } = useUpdateBasket();

  const [quantity, setQuantity] = useState<Record<number, number>>();
  const [hasQuantityChanged, setQuantityChanged] = useState(false);
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);

  useEffect(() => {
    if (basket?.items) {
      setQuantity(getItemsQuantity(basket.items));
      setQuantityChanged(false);
    }
  }, [basket]);

  const onItemQuantityChange = (id: number) => (qty: number) => {
    setQuantity({
      ...quantity,
      [id]: qty
    });
    setQuantityChanged(true);
  };

  const total = useMemo(() => {
    if (!basket) return;
    return basket.items.reduce(
      (total, { quantity, product }) => ({
        quantity: total.quantity + quantity,
        price: total.price + product.price * quantity
      }),
      { quantity: 0, price: 0 }
    );
  }, [basket]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateBasketDebounced = useCallback(
    debounce(300, (quantity: Record<number, number>) => {
      const dto: UpdateBasketDto = {
        items: Object.entries(quantity).map(([id, qty]) => ({
          productId: parseInt(id),
          qty
        }))
      };
      updateBasket(dto);
    }),
    [updateBasket]
  );

  useEffect(() => {
    if (!hasQuantityChanged || !quantity) return;
    updateBasketDebounced(quantity);
  }, [hasQuantityChanged, quantity, updateBasketDebounced]);

  const toggleOrderModalOpen = (isOpen: boolean) => () =>
    setOrderModalOpen(isOpen);

  return (
    <Box className={styles['container']}>
      <div className={styles['title']}>
        <h3>Корзина</h3>
        <span className={styles['quantity']}>{total?.quantity || 0}</span>
      </div>
      {(basket?.items.length || 0) > 0 && (
        <div className={styles['content']} data-loading={isFetching}>
          <div className={styles['items']}>
            {basket?.items?.map(({ product, ...item }) => (
              <div className={styles['item']} key={product.id}>
                <img
                  src={product.imageUrl}
                  alt={product.displayName}
                  className={styles['image']}
                />
                <div className={styles['info']}>
                  <span className={styles['name']}>{product.displayName}</span>
                  <span className={styles['weight']}>{product.weight}</span>
                  <span className={styles['price']}>{product.price}₽</span>
                </div>
                <div className={styles['quantity']}>
                  <QuantityInput
                    value={quantity?.[product.id as number] || item.quantity}
                    onChange={onItemQuantityChange(product.id as number)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className={styles['total']}>
            <span>Итого</span>
            <span>{total?.price || 0}₽</span>
          </div>
          <Button onClick={toggleOrderModalOpen(true)}>Оформить заказ</Button>
          <div className={styles['delivery-note']}>
            <Image src={pngIcons.delivery} alt="Бесплатная доставка" />
            <span>Бесплатная доставка</span>
          </div>
          <CreateOrderModal
            isOpen={isOrderModalOpen}
            close={toggleOrderModalOpen(false)}
          />
          {isFetching && (
            <div className={styles['loading']}>
              <LoadingIndicator />
            </div>
          )}
        </div>
      )}
    </Box>
  );
};
