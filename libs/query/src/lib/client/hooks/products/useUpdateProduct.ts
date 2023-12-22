'use client';

import { IProduct } from '@common/interfaces';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../api';

export const useUpdateProduct = (
  product: IProduct | undefined,
  onSuccess?: () => void
) => {
  const queryClient = useQueryClient();

  const { mutate: updateProduct, ...mutation } = useMutation({
    mutationFn: product
      ? apiClient.products.update.bind(null, product.id as number)
      : apiClient.products.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      if (onSuccess) onSuccess();
    }
  });

  return { updateProduct, ...mutation };
};
