import { SignInDto } from '@api/auth';
import { UpdateBasketDto } from '@api/basket';
import { CreateCategoryDto } from '@api/categories';
import { CreateOrderDto } from '@api/orders';
import { CreateProductDto } from '@api/products';
import {
  IBasket,
  ICategory,
  ICredentials,
  IOrder,
  IProduct
} from '@common/interfaces';
import axios from 'axios';
import { apiClientBase, baseURL, storeCredentials } from './fetchBase';

const auth = {
  signIn: (dto: SignInDto) =>
    axios
      .post<ICredentials>(`${baseURL}/auth/sign-in`, dto)
      .then(({ data: credentials }) => {
        storeCredentials(credentials);
        return credentials;
      })
};

const categories = {
  get: () =>
    apiClientBase.get<ICategory[]>('/categories').then(({ data }) => data),
  create: (dto: CreateCategoryDto & { image: File }) =>
    apiClientBase
      .postForm<ICategory>('/categories', dto)
      .then(({ data }) => data),
  update: (id: number, dto: CreateCategoryDto & { image?: File }) =>
    apiClientBase.putForm(`/categories/${id}`, dto).then(({ data }) => data),
  delete: (id: number) =>
    apiClientBase.delete(`/categories/${id}`).then(({ data }) => data)
};

const products = {
  get: () =>
    apiClientBase.get<IProduct[]>('/products').then(({ data }) => data),
  create: (dto: CreateProductDto & { image: File }) =>
    apiClientBase.postForm<IProduct>('/products', dto).then(({ data }) => data),
  update: (id: number, dto: CreateProductDto & { image?: File }) =>
    apiClientBase.putForm(`/products/${id}`, dto).then(({ data }) => data),
  delete: (id: number) =>
    apiClientBase.delete(`/products/${id}`).then(({ data }) => data)
};

const basket = {
  get: () =>
    apiClientBase.get<IBasket | undefined>('/basket').then(({ data }) => data),
  update: (dto: UpdateBasketDto) =>
    apiClientBase.post('/basket', dto).then(({ data }) => data)
};

const orders = {
  get: () => apiClientBase.get<IOrder[]>('/orders').then(({ data }) => data),
  create: (dto: CreateOrderDto) =>
    apiClientBase.post('/orders', dto).then(({ data }) => data),
  complete: (id: number) => apiClientBase.post(`/orders/${id}/complete`),
  cancel: (id: number) => apiClientBase.post(`/orders/${id}/cancel`)
};

export const apiClient = {
  auth,
  categories,
  products,
  basket,
  orders
};
