import axios, { AxiosError } from 'axios';
interface ErrorResponse {
  message?: string;
  [key: string]: any;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  title?: string;
  familyName?: string;
  shortDescription?: string;
  brand?: string;
  website?: string;
  country?: string;
  slug?: string;
  createdAt?: string;
  tag?: string;
}

interface ApiResponse {
  families: Array<{
    id: string;
    details?: {
      name?: string;
      description?: string;
      slug?: string;
    };
    brand?: {
      name?: string;
      website?: string;
      country?: string;
    };
    createdAt?: string;
  }>;
}

export const fetchProducts = async (page = 1, limit = 10): Promise<Product[]> => {
  try {
    const { data } = await axios.post<ApiResponse>(
      'https://api.blocksrvt.com/v1/families',
      {},
      {
        params: {
          locale: 'pt-br',
          page,
          limit,
          sortBy: 'recent'
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const rawProducts = data.families || [];

    return rawProducts.map((item) => ({
      id: item.id,
      name: item.details?.name || 'Produto sem nome',
      description: item.details?.description || 'Descrição não disponível',
      title: item.details?.name,
      familyName: item.details?.name,
      shortDescription: item.details?.description,
      brand: item.brand?.name,
      website: item.brand?.website,
      country: item.brand?.country,
      slug: item.details?.slug,
      createdAt: item.createdAt,
    }));

  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    
    console.error('Failed to fetch products:', {
      message: axiosError.message,
      status: axiosError.response?.status,
      data: axiosError.response?.data,
    });

    const errorMessage = typeof axiosError.response?.data === 'object' 
      ? axiosError.response?.data?.message 
      : undefined;

    throw new Error(errorMessage || 'Erro ao buscar produtos');
  }
};