import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || 'Erro ao fazer login');
      }

      const data = await response.json();
      console.log('Login successful:', data.email);
      login(data.token, data.user);
      navigate('/orders');

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro ao fazer login');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-lg p-8 border border-gray-200"
        >
          <div className="flex justify-center mb-6">
            <div className="text-2xl font-bold text-gray-800 flex items-center">
              <span className="text-orange-500 mr-1">Nest</span>
              <span className="text-blue-600">Store</span>
            </div>
          </div>
          
          <h2 className="text-3xl font-medium mb-6 text-gray-900">Fazer login</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white py-3 rounded-md font-medium shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Continuar
          </button>

          <div className="mt-4 text-xs text-gray-500">
            Ao continuar, você concorda com as Condições de Uso e o Aviso de Privacidade da MyStore.
          </div>
        </form>

        <div className="mt-6 text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Novo na Nest Store?</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/register')}
            className="cursor-pointer mt-6 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-md font-medium shadow-sm transition duration-150 ease-in-out border border-gray-300"
          >
            Criar sua conta da Nest Store
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;