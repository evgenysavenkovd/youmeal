import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../api';

export const useGetOrders = () => {
  const { data: orders, ...query } = useQuery({
    queryKey: ['orders'],
    queryFn: apiClient.orders.get,
    refetchOnMount: false
  });

  return { orders, ...query };
};
