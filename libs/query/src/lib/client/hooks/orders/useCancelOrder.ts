'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../api';

export const useCancelOrder = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  const { mutate: cancelOrder, ...mutation } = useMutation({
    mutationFn: apiClient.orders.cancel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      if (onSuccess) onSuccess();
    }
  });

  return { cancelOrder, ...mutation };
};
