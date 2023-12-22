'use client';

import { IProduct } from '@common/interfaces';
import { useDeleteProduct } from '@query';
import { AdminDrawerContext } from '@ui/common';
import { Button } from '@ui/controls';
import { EditProductForm } from '@ui/forms';
import { useContext } from 'react';
import { ProductsList, ProductsListProps } from './ProductsList';
import styles from './ProductsList.module.scss';

export type ProductsListAdminProps = Pick<ProductsListProps, 'category'>;

export const ProductsListAdmin = ({ category }: ProductsListAdminProps) => {
  const { setTitle, setContent, closeDrawer } = useContext(AdminDrawerContext);

  const { deleteProduct } = useDeleteProduct(closeDrawer);

  const openDrawer = (product: IProduct) => {
    setContent(
      <EditProductForm product={product} onSuccess={closeDrawer}>
        <Button
          styleType="alt"
          onClick={deleteProduct.bind(null, product.id as number, undefined)}
        >
          Удалить
        </Button>
      </EditProductForm>
    );
    setTitle('Изменить товар');
  };

  return (
    <ProductsList
      productButton={{
        text: 'Изменить',
        onClick: openDrawer
      }}
      category={category}
      className={styles['margin']}
    />
  );
};
