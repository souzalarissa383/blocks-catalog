import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductCard } from '@/components/ProductCard';

describe('ProductCard', () => {
  const mockProduct = {
    id: '1',
    name: 'Produto Teste',
    description: 'Descrição Teste',
    brand: 'Marca Teste'
  };

  it('handles image error correctly', async () => {

    render(<ProductCard product={mockProduct} />);
    
    const image = screen.getByAltText(mockProduct.name);
    
    expect(image).toHaveAttribute('src', expect.stringContaining(mockProduct.id));
    
    await act(async () => {

      Object.defineProperty(image, 'src', {
        get() { return this._src; },
        set(src) {

          if (src.includes(mockProduct.id)) {
            setTimeout(() => {
              fireEvent.error(image);
            }, 0);
          }
          this._src = src;
        }
      });
      
      fireEvent.error(image);
    });
    
    expect(image).toHaveAttribute('src', 'https://via.placeholder.com/300x300?text=Sem+Imagem');
  });
});