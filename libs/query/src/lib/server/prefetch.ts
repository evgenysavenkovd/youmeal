import { QueryClient, dehydrate } from '@tanstack/react-query';
import { apiServer } from './api';

export async function prefetchProducts() {
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['categories'],
      queryFn: apiServer.getCategories
    }),
    queryClient.prefetchQuery({
      queryKey: ['products'],
      queryFn: apiServer.getProducts
    }),
    queryClient.prefetchQuery({
      queryKey: ['basket'],
      queryFn: apiServer.getBasket
    })
  ]);
  const dehydratedState = dehydrate(queryClient);

  return { dehydratedState };
}

export async function prefetchOrders() {
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['orders'],
      queryFn: apiServer.getOrders
    })
  ]);
  const dehydratedState = dehydrate(queryClient);

  return { dehydratedState };
}
