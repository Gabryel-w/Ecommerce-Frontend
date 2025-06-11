import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Order {
  id: string;
  createdAt: string;
  total: number;
  items: {
    product: {
      name: string;
      price: number;
    };
    quantity: number;
  }[];
}

export const Orders = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:3000/orders/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar pedidos');
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, token, navigate]);

  if (loading) return <p className="p-4">Carregando pedidos...</p>;

  if (orders.length === 0) {
    return <p className="p-4">Você ainda não tem pedidos.</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Seus Pedidos</h1>
      {orders.map((order) => (
        <div key={order.id} className="border rounded p-4 mb-4 shadow">
          <p className="text-sm text-gray-600 mb-2">
            Pedido feito em: {new Date(order.createdAt).toLocaleDateString()}
          </p>
          <ul className="mb-2">
            {order.items.map((item, idx) => (
              <li key={idx} className="flex justify-between">
                <span>
                  {item.product.name} × {item.quantity}
                </span>
                <span>R$ {(item.product.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <p className="font-semibold">Total: R$ {order.total.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};
