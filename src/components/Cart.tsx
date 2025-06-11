// src/pages/Cart.tsx
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

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
    return <div className="p-6">Seu carrinho está vazio.</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Seu Carrinho</h1>
      <ul className="space-y-4">
        {cart.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center border p-4 rounded shadow"
          >
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-600">
                Quantidade: {item.quantity}
              </p>
              <p className="text-green-600 font-bold">
                R$ {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-600 hover:underline"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-between items-center">
        <p className="text-lg font-semibold">
          Total: R$ {total.toFixed(2)}
        </p>
        <button
          onClick={handleCheckout}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Finalizar Compra
        </button>
      </div>
    </div>
  );
};

export default Cart;
