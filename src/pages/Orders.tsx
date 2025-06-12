import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Order {
  id: string;
  createdAt: string;
  total: number;
  items: {
    product: {
      id: string;
      name: string;
      price: number;
      image?: string;
    };
    quantity: number;
  }[];
  status?: string;
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

  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-6 w-48 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 w-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="bg-gray-100 min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Você ainda não tem pedidos</h2>
            <p className="text-gray-600 mb-6">Quando você fizer um pedido, ele aparecerá aqui</p>
            <button
              onClick={() => navigate('/')}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-6 rounded-md shadow-sm"
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
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Seus Pedidos</h1>

        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="border-b p-4 bg-gray-50">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-2 sm:mb-0">
                    <h3 className="font-medium text-gray-800">
                      Pedido #{String(order.id).split('-')[0].toUpperCase()}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Feito em {new Date(order.createdAt).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-700 mr-2">Total:</span>
                    <span className="text-lg font-bold">R$ {order.total.toFixed(2)}</span>
                  </div>
                </div>
                {order.status && (
                  <div className="mt-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${order.status === 'Entregue'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'Cancelado'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                      {order.status}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-4">
                <h4 className="font-medium text-gray-700 mb-3">Itens do pedido</h4>
                <ul className="divide-y">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="py-3">
                      <div className="flex items-start">
                        <div className="bg-gray-200 rounded-md w-16 h-16 flex-shrink-0 flex items-center justify-center mr-4">
                          {item.product.image ? (
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="object-contain h-full"
                            />
                          ) : (
                            <svg
                              className="h-8 w-8 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h5 className="font-medium text-gray-800">{item.product.name}</h5>
                              <p className="text-sm text-gray-500">Quantidade: {item.quantity}</p>
                            </div>
                            <p className="font-medium">R$ {(item.product.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <div className="mt-2 flex justify-end">
                            <button
                              onClick={() => navigate(`/product/${item.product.id}`)}
                              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              Comprar novamente
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t p-4 bg-gray-50 flex justify-end">
                <button
                  onClick={() => navigate(`/order/${order.id}`)}
                  className="text-sm bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md shadow-sm"
                >
                  Ver detalhes do pedido
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};