'use client';

import { IProduct } from '@common/interfaces';
import { useGetProducts } from '@query';
import { Box } from '@ui/common/server';
import { Button } from '@ui/controls';
import { concat } from '@ui/styles/server';
import { useMemo } from 'react';
import styles from './ProductsList.module.scss';

export interface ProductsListProps {
  productButton?: {
    text: string;
    onClick: (product: IProduct) => void;
  };
  category?: number;
  className?: string;
}

export const ProductsList = ({
  productButton,
  category,
  className
}: ProductsListProps) => {
  const { products } = useGetProducts();

  const visibleProducts = useMemo(() => {
    if (!products) return [];
    if (category)
      return products.filter((product) => product.category === category);
    return products;
  }, [products, category]);

  return (
    <div className={concat(styles['container'], className)}>
      {visibleProducts.map((product) => (
        <Box styleType="small" className={styles['product']} key={product.id}>
          <img
            src={product.imageUrl}
            alt={product.displayName}
            className={styles['image']}
          />
          <span className={styles['price']}>{product.price}₽</span>
          <span className={styles['name']}>{product.displayName}</span>
          <span className={styles['weight']}>{product.weight}г</span>
          <Button
            styleType="gray"
            onClick={productButton?.onClick.bind(null, product)}
          >
            {productButton?.text}
          </Button>
        </Box>
      ))}
    </div>
  );
};
