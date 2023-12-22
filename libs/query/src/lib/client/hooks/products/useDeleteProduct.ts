import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../api';

export const useDeleteProduct = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const { mutate: deleteProduct, ...mutation } = useMutation({
    mutationFn: apiClient.products.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      if (onSuccess) onSuccess();
    }
  });

  return { deleteProduct, ...mutation };
};
