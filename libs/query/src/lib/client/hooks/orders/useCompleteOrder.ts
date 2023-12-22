'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../api';

export const useCompleteOrder = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  const { mutate: completeOrder, ...mutation } = useMutation({
    mutationFn: apiClient.orders.complete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      if (onSuccess) onSuccess();
    }
  });

  return { completeOrder, ...mutation };
};
