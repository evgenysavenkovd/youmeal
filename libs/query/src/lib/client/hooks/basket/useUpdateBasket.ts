'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../api';

export const useUpdateBasket = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  const { mutate: updateBasket, ...mutation } = useMutation({
    mutationFn: apiClient.basket.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['basket'] });
      if (onSuccess) onSuccess();
    }
  });

  return { updateBasket, ...mutation };
};
