import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProducts, Product } from '../services/api';

type ProductPage = {
  products: Product[];
  nextPage?: number;
};

export const useProducts = () => {
  return useInfiniteQuery({
    queryKey: ['products'],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const products = await fetchProducts(pageParam, 10);
      
      const mappedProducts = products.map((item: any) => ({
        id: item.id,
        name: item.name || item.title || item.familyName,
        description: item.description || item.shortDescription,
        ...item
      }));

      return {
        products: mappedProducts,
        nextPage: products.length === 10 ? pageParam + 1 : undefined,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};