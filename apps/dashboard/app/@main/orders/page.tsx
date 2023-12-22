import { prefetchOrders } from '@query/server';
import { HydrationBoundary } from '@tanstack/react-query';
import { OrdersList } from '@ui/views';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Заказы'
};

export default async function OrdersPage() {
  const { dehydratedState } = await prefetchOrders();

  return (
    <HydrationBoundary state={dehydratedState}>
      <OrdersList />
    </HydrationBoundary>
  );
}
