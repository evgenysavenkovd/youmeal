import { IBasket, ICategory, IOrder, IProduct } from '@common/interfaces';
import { apiServerBase } from './fetchBase';

export const apiServer = {
  getCategories: () =>
    apiServerBase.get<ICategory[]>('/categories').then(({ data }) => data),
  getCurrentUser: () => apiServerBase.get('/users/me').then(({ data }) => data),
  getProducts: () =>
    apiServerBase.get<IProduct[]>('/products').then(({ data }) => data),
  getBasket: () =>
    apiServerBase.get<IBasket | undefined>('/basket').then(({ data }) => data),
  getOrders: () =>
    apiServerBase.get<IOrder[]>('/orders').then(({ data }) => data)
};
