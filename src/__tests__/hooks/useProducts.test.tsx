import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useProducts } from '@/hooks/useProducts';
import React from 'react';

jest.mock('@/services/api', () => ({
  fetchProducts: jest.fn(() => Promise.resolve([
    { 
      id: '1', 
      name: 'Produto Teste',
      title: 'Produto Teste',
      description: 'Descrição teste'
    }
  ]))
}));

const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
      },
    },
  });
};

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={createTestQueryClient()}>
      {children}
    </QueryClientProvider>
  );
};

describe('useProducts hook', () => {
  it('deve retornar os produtos com sucesso', async () => {
    const { result } = renderHook(() => useProducts(), {
      wrapper: TestWrapper
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    
    expect(result.current.data).toEqual({
      pageParams: [1],
      pages: [
        {
          products: [
            {
              id: '1',
              name: 'Produto Teste',
              description: 'Descrição teste',
              title: 'Produto Teste',
              shortDescription: undefined
            }
          ],
          nextPage: undefined
        }
      ]
    });
  });
});