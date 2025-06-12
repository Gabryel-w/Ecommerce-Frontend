import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import placeholderImage from '../assets/placeholderImage.png';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (!user || !token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.id,
          items: cart.map(({ id, name, price, quantity }) => ({
            product: { id, name, price },
            quantity,
          })),
          total,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao finalizar pedido');
      }

      clearCart();
      navigate('/orders');
    } catch (error) {
      console.error(error);
      alert('Erro ao finalizar o pedido');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="bg-gray-100 min-h-screen py-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8 text-center mt-50">
            <svg
              className="mx-auto h-16 w-16 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Seu carrinho está vazio</h2>
            <p className="text-gray-600 mb-6">Adicione itens ao seu carrinho para começar a comprar</p>
            <button
              onClick={() => navigate('/')}
              className="cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-6 rounded-md shadow-sm"
            >
              Continuar comprando
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Carrinho de Compras</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 flex-1">
            <div className="border-b pb-4 mb-4 hidden md:block">
              <div className="grid grid-cols-12 gap-4 text-gray-500 font-medium text-sm">
                <div className="col-span-6">Produto</div>
                <div className="col-span-2 text-center">Preço</div>
                <div className="col-span-2 text-center">Quantidade</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>
            </div>

            <ul className="divide-y">
              {cart.map((item) => (
                <li key={item.id} className="py-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="bg-gray-200 rounded-md w-24 h-24 flex items-center justify-center">
                      <img src={placeholderImage} alt={item.name} className="object-contain h-full" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium text-gray-800">{item.name}</h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-yellow-600 hover:text-yellow-700 text-sm mt-1 flex items-center cursor-pointer"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Remover
                          </button>
                        </div>
                        <div className="md:hidden text-right">
                          <p className="text-gray-800 font-medium">R$ {(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-12 gap-4 mt-2">
                        <div className="col-span-6 md:col-span-2 flex items-center justify-center">
                          <p className="text-gray-600 hidden md:block">R$ {item.price.toFixed(2)}</p>
                        </div>
                        <div className="col-span-6 md:col-span-2 flex items-center justify-center">
                          <span className="bg-gray-100 px-3 py-1 rounded-md">{item.quantity}</span>
                        </div>
                        <div className="col-span-12 md:col-span-2 flex items-center justify-end">
                          <p className="text-gray-800 font-medium hidden md:block">R$ {(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex justify-end mt-4">
              <button
                onClick={clearCart}
                className="text-gray-600 hover:text-gray-800 text-sm flex items-center cursor-pointer"
              >
                <svg className="w-4 h-4 mr-1 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Limpar carrinho
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 h-fit lg:w-80">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Resumo do Pedido</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({cart.reduce((acc, item) => acc + item.quantity, 0)} itens)</span>
                <span className="font-medium">R$ {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Frete</span>
                <span className="font-medium text-green-600">Grátis</span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold text-lg">R$ {total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-yellow-400 cursor-pointer hover:bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-md shadow-sm transition-colors"
            >
              Finalizar Compra
            </button>

            <div className="mt-4 text-xs text-gray-500">
              <p>* O valor final pode variar conforme a forma de pagamento</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-800 flex items-center cursor-pointer"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Continuar comprando
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;