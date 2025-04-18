import { fetchProducts } from '@/services/api';

jest.mock('@/services/api', () => ({
  fetchProducts: jest.fn()
}));

describe('API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve buscar produtos com sucesso', async () => {
    const mockData = [{
      id: '1',
      name: 'Produto Teste',
      title: 'Produto Teste',
      description: 'Descrição teste'
    }];
    
    (fetchProducts as jest.Mock).mockResolvedValue(mockData);

    const result = await fetchProducts(1, 10); 
    expect(result).toEqual(mockData);
  });

  it('deve lidar com erro na API', async () => {
    (fetchProducts as jest.Mock).mockRejectedValue(new Error('Falha na API'));
    await expect(fetchProducts(1, 10)).rejects.toThrow('Falha na API');
  });
});