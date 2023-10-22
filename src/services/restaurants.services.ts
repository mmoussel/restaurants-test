import { useQuery } from '@tanstack/react-query';
import { api } from 'src/utils/api.util';

export const useRestaurantsQuery = () => {
  return useQuery({
    queryKey: ['restaurants'],
    queryFn: () => {
      return api.get('businesses/search', {
        params: {
          location: 'san jose',
          limit: 50,
        },
      });
    },
  });
};

export const useRestaurantByIdQuery = ({ id }: { id?: string }) => {
  return useQuery({
    queryKey: ['restaurant', id],
    queryFn: () => {
      return api.get(`businesses/${id}`);
    },
    enabled: Boolean(id),
  });
};
