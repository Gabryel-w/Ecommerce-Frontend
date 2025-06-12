import { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import placeholderImage from '../assets/placeholderImage.png';
import { toast } from 'react-hot-toast';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
};

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((res) => res.json())
      .then(setProducts)
      .catch((err) => console.error('Erro ao carregar produtos:', err));
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (product: Product) => {
    addToCart({ ...product, id: String(product.id), quantity: 1 });
    toast.success(`${product.name} adicionado ao carrinho!`, {
      position: 'bottom-right',
      duration: 3000,
      style: {
       background: '#363636',
            color: '#fff',}
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen pb-10">
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto p-20">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Buscar produtos..."
              className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-6">
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              Nenhum produto encontrado
            </h3>
            <p className="mt-1 text-gray-500">
              Tente ajustar sua busca ou filtro para encontrar o que procura.
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4">Produtos em Destaque</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
                >
                  <div className="bg-gray-200 h-48 flex items-center justify-center">
                    <img
                      src={product.image || placeholderImage}
                      alt={product.name}
                      className="object-fit h-full w-100"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = placeholderImage;
                        (e.target as HTMLImageElement).classList.add('opacity-70', 'p-4');
                      }}
                    />
                  </div>

                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-medium text-gray-900 mb-1 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="mt-auto">
                      <div className="flex items-center mb-3">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`h-4 w-4 ${
                                star <= 4 ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="text-gray-600 text-xs ml-1">(24)</span>
                        </div>
                      </div>
                      <div className="flex items-end justify-between">
                        <div>
                          <span className="text-sm text-gray-500 line-through">
                            R$ {(product.price * 1.2).toFixed(2)}
                          </span>
                          <p className="text-xl font-bold text-gray-900">
                            R$ {product.price.toFixed(2)}
                          </p>
                          <p className="text-xs text-green-600 font-semibold">
                            Em até 12x sem juros
                          </p>
                        </div>
                        {user ? (
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
                          >
                            <svg
                              className="h-5 w-5 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                            Comprar
                          </button>
                        ) : (
                          <div className="text-xs text-gray-500">
                            Faça login para comprar
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;