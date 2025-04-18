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
  
  export const fetchProducts = async (page = 1, limit = 10): Promise<Product[]> => {
    try {
      const response = await fetch(
        `https://api.blocksrvt.com/v1/families?locale=pt-br&page=${page}&limit=${limit}&sortBy=recent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({})  
        }
      );
  
      if (!response.ok) {
        throw new Error('Erro ao buscar produtos');
      }
  
      const data = await response.json();
      const rawProducts = data.families || [];
  
      const products: Product[] = rawProducts.map((item: any) => {
        const details = item.details || {};
        const brand = item.brand || {};
  
        return {
          id: item.id,
          name: details.name || 'Produto sem nome',
          description: details.description || 'Descrição não disponível',
          title: details.name,
          familyName: details.name,
          shortDescription: details.description,
          brand: brand.name,
          website: brand.website,
          country: brand.country,
          slug: details.slug,
          createdAt: item.createdAt,
        };
      });
  
      return products;
    } catch (error) {
      console.error('Failed to fetch products:', error);
      throw error;
    }
  };
  