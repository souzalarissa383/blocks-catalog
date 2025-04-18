import { Product } from '../services/api';
import { useState } from 'react';

type ProductCardProps = {
  product: Product;
  isLoading?: boolean;
};

export const ProductCard = ({ product, isLoading = false }: ProductCardProps) => {
  const [imageError, setImageError] = useState(false);
  
  if (!product?.id) return null;

  const productName = product.name || product.title || "Placa Bon Appétit";
  const productDescription = product.description || "Placa de parede retrô em alumínio";
  const productTag = 'Premium';
  const productBrand = product.brand || "Blocks";

  if (isLoading) {
    return (
      <article className="product-card bg-white rounded-lg shadow overflow-hidden animate-pulse">
        <div className="relative pt-[100%] bg-gray-200"></div>
        <div className="p-4">
          <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </article>
    );
  }

  return (
    <article 
      className="product-card bg-white rounded-lg shadow overflow-hidden transition-transform hover:scale-[1.02]"
      aria-labelledby={`product-title-${product.id}`}
      aria-describedby={`product-desc-${product.id}`}
    >
      <div className="product-image-container relative aspect-square">
        <img
          src={imageError 
            ? 'https://via.placeholder.com/300x300?text=Sem+Imagem' 
            : `https://plugin-storage.nyc3.digitaloceanspaces.com/families/images/${product.id}.webp`
          }
          alt={productName}
          className="product-image bg-gray-100 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          width={300}
          height={300}
          onError={() => setImageError(true)}
          onLoad={() => setImageError(false)}
        />
        <span 
          className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent text-primary-foreground hover:bg-primary/80 absolute top-2 right-2 bg-amber-500"
          aria-label={`Categoria: ${productTag}`}
        >
          {productTag}
        </span>
      </div>
      <div className="product-content bg-white p-4">
        <h3 
          id={`product-title-${product.id}`}
          className="product-title text-lg font-semibold mb-2 line-clamp-2"
        >
          {productName}
        </h3>
        <p 
          id={`product-desc-${product.id}`}
          className="product-description text-gray-600 mb-3 line-clamp-3"
        >
          {productDescription}
        </p>
        <div className="mt-2">
          <span className="product-brand text-sm text-gray-500">
            {productBrand}
          </span>
        </div>
      </div>
    </article>
  );
};