'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../api';

export const useGetProducts = () => {
  const { data: products, ...query } = useQuery({
    queryKey: ['products'],
    queryFn: apiClient.products.get,
    refetchOnMount: false
  });

  return { products, ...query };
};
