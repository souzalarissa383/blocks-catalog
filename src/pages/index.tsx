import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';

export default function Home() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
    error,
    refetch,
  } = useProducts();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isPending && !data) {
    return (
      <main className="w-full min-h-screen p-8 bg-white">
        <h1 className="sr-only">Carregando produtos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6" aria-busy="true">
          {[...Array(10)].map((_, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow overflow-hidden"
              aria-hidden="true"
            >
              <div className="relative pt-[100%] bg-gray-200 animate-pulse"></div>
              <div className="p-4">
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="w-full min-h-screen p-8 bg-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4 text-center">Erro ao carregar produtos</h1>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          {error?.message || 'Ocorreu um erro ao buscar os produtos. Por favor, tente novamente.'}
        </p>
        <button
          onClick={() => refetch()}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Tentar carregar os produtos novamente"
        >
          Tentar novamente
        </button>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen p-8 bg-white">
      <h1 className="sr-only">Catálogo de Produtos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {data?.pages?.flatMap((page) =>
          page.products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          )) || []
        )}
      </div>
      <div 
        ref={ref}
        className="h-20 flex justify-center items-center"
        aria-live="polite"
      >
        {isFetchingNextPage ? (
          <div 
            className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"
            aria-label="Carregando mais produtos"
          ></div>
        ) : hasNextPage ? (
          <button
            onClick={() => fetchNextPage()}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            disabled={isFetchingNextPage}
            aria-label="Carregar mais produtos"
          >
            Carregar mais
          </button>
        ) : (
          <p className="text-gray-500">Todos os produtos foram carregados</p>
        )}
      </div>
    </main>
  );
}