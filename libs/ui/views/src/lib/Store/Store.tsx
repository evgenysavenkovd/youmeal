'use client';

import { UpdateBasketDto } from '@api/basket';
import { ICategory, IProduct } from '@common/interfaces';
import { useGetCategories, useUpdateBasket } from '@query';
import { useState } from 'react';
import { Basket } from '../Basket';
import { CategoriesList } from '../CategoriesList';
import { ProductsList } from '../ProductsList';
import styles from './Store.module.scss';

export const Store = () => {
  const { categories } = useGetCategories();
  const { updateBasket } = useUpdateBasket();

  const [category, setCategory] = useState<ICategory | undefined>(
    categories?.[0]
  );

  const onProductClick = (product: IProduct) => {
    const dto: UpdateBasketDto = {
      items: [{ productId: product.id as number, qty: 1 }]
    };
    updateBasket(dto);
  };

  return (
    <>
      <CategoriesList selected={category?.id} onClick={setCategory} />
      <main className={styles['main']}>
        <div className={styles['basket']}>
          <Basket />
        </div>
        <section className={styles['store']}>
          <h1 className={styles['title']}>{category?.displayName}</h1>
          <ProductsList
            productButton={{
              text: 'Добавить',
              onClick: onProductClick
            }}
            category={category?.id}
          />
        </section>
      </main>
    </>
  );
};
