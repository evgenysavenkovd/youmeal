import { ICategory } from '@common/interfaces';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../api';

export const useUpdateCategory = (
  category: ICategory | undefined,
  onSuccess?: () => void
) => {
  const queryClient = useQueryClient();
  const { mutate: updateCategory, ...mutation } = useMutation({
    mutationFn: category
      ? apiClient.categories.update.bind(null, category.id as number)
      : apiClient.categories.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      if (onSuccess) onSuccess();
    }
  });

  return { updateCategory, ...mutation };
};
