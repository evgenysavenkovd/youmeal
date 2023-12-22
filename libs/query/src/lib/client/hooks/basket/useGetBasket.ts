'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../api';

export const useGetBasket = () => {
  const { data: basket, ...query } = useQuery({
    queryKey: ['basket'],
    queryFn: apiClient.basket.get,
    refetchOnMount: false
  });

  return { basket, ...query };
};
