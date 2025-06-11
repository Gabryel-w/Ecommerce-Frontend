import { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
};

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((res) => res.json())
      .then(setProducts)
      .catch((err) => console.error('Erro ao carregar produtos:', err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Produtos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded p-4 flex flex-col"
          >
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600 text-sm mb-2">{product.description}</p>
            <p className="text-green-600 font-bold mb-4">
              R$ {product.price.toFixed(2)}
            </p>
            <button
              onClick={() => addToCart({ ...product, id: String(product.id), quantity: 1 })}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mt-auto"
            >
              Adicionar ao Carrinho
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
