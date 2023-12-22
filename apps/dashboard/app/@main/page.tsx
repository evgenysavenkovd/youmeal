import { prefetchProducts } from '@query/server';
import { HydrationBoundary } from '@tanstack/react-query';
import { AdminDashboard } from '@ui/views';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Главная'
};

export default async function Page() {
  return <MainPage />;
}

async function MainPage() {
  const { dehydratedState } = await prefetchProducts();

  return (
    <HydrationBoundary state={dehydratedState}>
      <AdminDashboard />
    </HydrationBoundary>
  );
}
