'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../api';

export const useCreateOrder = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  const { mutate: createOrder, ...mutation } = useMutation({
    mutationFn: apiClient.orders.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['basket'] });
      if (onSuccess) onSuccess();
    }
  });

  return { createOrder, ...mutation };
};
