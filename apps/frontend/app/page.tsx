import { prefetchProducts } from '@query/server';
import { HydrationBoundary } from '@tanstack/react-query';
import { Hero } from '@ui/common/server';
import { Store } from '@ui/views';

export default async function Page() {
  const { dehydratedState } = await prefetchProducts();

  return (
    <HydrationBoundary state={dehydratedState}>
      <Hero />
      <Store />
    </HydrationBoundary>
  );
}
