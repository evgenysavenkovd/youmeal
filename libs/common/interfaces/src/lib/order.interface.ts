import { IProduct } from './product.interface';

export interface IOrder {
  id?: number;
  items: IOrderItem[];
  name: string;
  phone: string;
  deliveryType: 'pickup' | 'delivery';
  address?: IOrderAddress;
  status: 'pending' | 'completed' | 'canceled';
}

export interface IOrderItem {
  product: IProduct;
  quantity: number;
}

export interface IOrderAddress {
  street: string;
  floor: string;
  intercom: string;
}
