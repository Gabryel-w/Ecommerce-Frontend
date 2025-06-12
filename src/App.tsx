
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { Orders } from './pages/Orders';
import { AuthProvider } from './contexts/AuthContext';
import { Header } from './components/Header';
import Footer from './components/Footer';
import Cart from './components/Cart';
import { Toaster } from 'react-hot-toast';
import './App.css'; 

export default function App() {
  return (
    <AuthProvider>
        <Header />
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
        <Toaster position="bottom-right" />
        <Footer />
     
    </AuthProvider>
  );
}
