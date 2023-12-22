import { IBasketItem } from '@common/interfaces';

export const getItemsQuantity = (items: IBasketItem[]) =>
  items.reduce(
    (result, { product, quantity }) => ({
      ...result,
      [product.id as number]: quantity
    }),
    {} as Record<number, number>
  );
