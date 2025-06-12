import { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((res) => res.json())
      .then(setProducts)
      .catch((err) => console.error('Erro ao carregar produtos:', err));
  }, []);

  useEffect(() => {
    if (location.state?.searchTerm) {
      setSearchTerm(location.state.searchTerm);
    }
  }, [location.state]);

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
        color: '#fff',
      }
    });
  };

  return (
    <div className="pb-10">
      <div className="max-w-7xl mx-auto px-4 mt-8">
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-10 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-4 text-2xl font-semibold text-gray-800">
              Nenhum produto encontrado
            </h3>
            <p className="mt-2 text-gray-500">
              Tente ajustar sua busca ou filtro para encontrar o que procura.
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
              Produtos em Destaque
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden border border-gray-200"
                >
                  <div className="bg-gray-100 h-48 flex items-center justify-center overflow-hidden">
                    <img
                      src={
                        !product.image || product.image.includes('placeimg.com')
                          ? placeholderImage
                          : product.image
                      }
                      alt={product.name}
                      className="object-fit h-full w-100"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = placeholderImage;
                        (e.target as HTMLImageElement).classList.add('opacity-70', 'p-4');
                      }}
                    />
                  </div>

                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="mt-auto">
                      <div className="flex items-center mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`h-4 w-4 ${star <= 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-xs text-gray-500 ml-1">(24)</span>
                      </div>
                      <div className="flex items-end justify-between">
                        <div>
                          <span className="text-sm text-gray-400 line-through block">
                            R$ {(product.price * 1.2).toFixed(2)}
                          </span>
                          <p className="text-xl font-bold text-green-600">
                            R$ {product.price.toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-500 font-medium">
                            Em até 12x sem juros
                          </p>
                        </div>
                        {user ? (
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-2 px-4 rounded-lg text-sm font-semibold flex items-center transition-all duration-200 shadow-sm hover:shadow-md"
                          >
                            <svg
                              className="h-5 w-5 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
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
                          <span className="text-xs text-gray-500 italic">Faça login para comprar</span>
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