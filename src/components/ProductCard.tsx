import { Product } from '../services/api';

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  if (!product?.id) return null;

  const productName = product.name || product.title || "Placa Bon Appétit";
  const productDescription = product.description || "Placa de parede retrô em alumínio";
  const productTag = 'Premium';
  const productBrand = product.brand || "Blocks";

  return (
    <div className="product-card bg-white">
      <div className="product-image-container">
      <img
        src={`https://plugin-storage.nyc3.digitaloceanspaces.com/families/images/${product.id}.webp`}
        alt={productName}
        className="product-image bg-gray-100"
        onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x300?text=Sem+Imagem';
        }}
        />
        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent text-primary-foreground hover:bg-primary/80 absolute top-2 right-2 bg-amber-500">
          {productTag}
        </span>
      </div>
      <div className="product-content bg-white">
        <h3 className="product-title">{productName}</h3>
        <p className="product-description">{productDescription}</p>
        <div className="mt-2">
          <span className="product-brand">
            {productBrand}
          </span>
        </div>
      </div>
    </div>
  );
};