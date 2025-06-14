import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { SearchBar } from './SearchBar';

export const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSearch = (term: string) => {
        navigate('/', { state: { searchTerm: term } });
    };

    return (
        <header className="bg-gray-900 text-white sticky top-0 z-50 shadow-md">
            <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold hover:text-yellow-400">
                        <span className="text-yellow-400">Nest</span>Store
                    </Link>

                    <button 
                        className="md:hidden p-2 focus:outline-none"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <div className="w-6 flex flex-col space-y-1">
                            <span className={`h-0.5 w-full bg-white transition ${isMenuOpen ? 'transform rotate-45 translate-y-1.5' : ''}`}></span>
                            <span className={`h-0.5 w-full bg-white transition ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                            <span className={`h-0.5 w-full bg-white transition ${isMenuOpen ? 'transform -rotate-45 -translate-y-1.5' : ''}`}></span>
                        </div>
                    </button>
                </div>

                <div className="w-full md:w-1/2 px-4 md:px-0">
                    <SearchBar onSearch={handleSearch} />
                </div>

                <nav className="hidden md:flex items-center space-x-6">
                    <Link to="/" className="hover:text-yellow-400 font-medium">Produtos</Link>

                    {!user ? (
                        <>
                            <Link to="/login" className="hover:text-yellow-400">Login</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/cart" className="flex items-center hover:text-yellow-400 relative">
                                Carrinho
                            </Link>
                            <Link to="/orders" className="hover:text-yellow-400">Pedidos</Link>
                            <span className="text-gray-300">Olá, <strong className="text-yellow-400">{user.name}</strong></span>
                            <button
                                onClick={handleLogout}
                                className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm cursor-pointer"
                            >
                                Sair
                            </button>
                        </>
                    )}
                </nav>
            </div>

            {isMenuOpen && (
                <div className="md:hidden bg-gray-800 pb-4 px-4">
                    <nav className="flex flex-col space-y-3">
                        <Link 
                            to="/" 
                            className="hover:text-yellow-400 font-medium py-2 border-b border-gray-700"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Produtos
                        </Link>

                        {!user ? (
                            <>
                                <Link 
                                    to="/login" 
                                    className="hover:text-yellow-400 py-2 border-b border-gray-700"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link 
                                    to="/register" 
                                    className="hover:text-yellow-400 py-2 border-b border-gray-700"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Registrar
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link 
                                    to="/cart" 
                                    className="flex items-center hover:text-yellow-400 py-2 border-b border-gray-700"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Carrinho
                                </Link>
                                <Link 
                                    to="/orders" 
                                    className="hover:text-yellow-400 py-2 border-b border-gray-700"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Pedidos
                                </Link>
                                <div className="text-gray-300 py-2 border-b border-gray-700">
                                    Olá, <strong className="text-yellow-400">{user.name}</strong>
                                </div>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded text-sm w-full text-left"
                                >
                                    Sair
                                </button>
                            </>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
};