import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../api';

export const useGetCategories = () => {
  const { data: categories, ...query } = useQuery({
    queryKey: ['categories'],
    queryFn: apiClient.categories.get,
    refetchOnMount: false
  });

  return { categories, ...query };
};
