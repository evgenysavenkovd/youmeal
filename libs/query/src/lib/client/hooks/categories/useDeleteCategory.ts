import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../api';

export const useDeleteCategory = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const { mutate: deleteCategory, ...mutation } = useMutation({
    mutationFn: apiClient.categories.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      if (onSuccess) onSuccess();
    }
  });

  return { deleteCategory, ...mutation };
};
