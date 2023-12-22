import { IProduct } from './product.interface';

export interface IBasket {
  id?: number;
  items: IBasketItem[];
}

export interface IBasketItem {
  product: IProduct;
  quantity: number;
}
