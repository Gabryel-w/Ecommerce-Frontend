import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-indigo-600">MyStore</Link>

            <nav className="flex items-center gap-4">
                <Link to="/" className="text-gray-700 hover:text-indigo-600">Produtos</Link>

                {!user && (
                    <>
                        <Link to="/login" className="text-gray-700 hover:text-indigo-600">Login</Link>
                        <Link to="/register" className="text-gray-700 hover:text-indigo-600">Registrar</Link>
                    </>
                )}

                {user && user.name && (
                    <>
                        <Link to="/cart" className="text-gray-700 hover:text-indigo-600">Carrinho</Link>
                        <Link to="/orders" className="text-gray-700 hover:text-indigo-600">Pedidos</Link>
                        <span className="text-gray-600">Olá, <strong>{user.name}</strong></span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                            Sair
                        </button>
                    </>
                )}

            </nav>
        </header>
    );
};
