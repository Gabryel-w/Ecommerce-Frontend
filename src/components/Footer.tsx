import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to top button */}
        <div className="py-4 border-b border-gray-300">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-full py-2 text-sm bg-gray-200 hover:bg-gray-300 transition-colors rounded-md"
          >
            Voltar ao topo
          </button>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8">
          {/* Column 1 */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4">Conheça-nos</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-gray-600 hover:text-orange-500">Informações sobre a MyStore</Link></li>
              <li><Link to="/careers" className="text-sm text-gray-600 hover:text-orange-500">Carreiras</Link></li>
              <li><Link to="/blog" className="text-sm text-gray-600 hover:text-orange-500">Blog</Link></li>
              <li><Link to="/press" className="text-sm text-gray-600 hover:text-orange-500">Imprensa</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4">Ganhe dinheiro conosco</h3>
            <ul className="space-y-2">
              <li><Link to="/sell" className="text-sm text-gray-600 hover:text-orange-500">Vender na MyStore</Link></li>
              <li><Link to="/affiliate" className="text-sm text-gray-600 hover:text-orange-500">Programa de Afiliados</Link></li>
              <li><Link to="/advertise" className="text-sm text-gray-600 hover:text-orange-500">Anuncie seus produtos</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4">Pagamentos</h3>
            <ul className="space-y-2">
              <li><Link to="/payment-methods" className="text-sm text-gray-600 hover:text-orange-500">Métodos de pagamento</Link></li>
              <li><Link to="/gift-cards" className="text-sm text-gray-600 hover:text-orange-500">Cartões-presente</Link></li>
              <li><Link to="/installments" className="text-sm text-gray-600 hover:text-orange-500">Parcelamento</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4">Deixe-nos ajudar você</h3>
            <ul className="space-y-2">
              <li><Link to="/account" className="text-sm text-gray-600 hover:text-orange-500">Sua conta</Link></li>
              <li><Link to="/orders" className="text-sm text-gray-600 hover:text-orange-500">Seus pedidos</Link></li>
              <li><Link to="/shipping" className="text-sm text-gray-600 hover:text-orange-500">Frete e prazo de entrega</Link></li>
              <li><Link to="/returns" className="text-sm text-gray-600 hover:text-orange-500">Devoluções e reembolsos</Link></li>
              <li><Link to="/help" className="text-sm text-gray-600 hover:text-orange-500">Ajuda</Link></li>
            </ul>
          </div>
        </div>

        {/* Logo and copyright section */}
        <div className="border-t border-gray-300 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="text-xl font-bold text-gray-800 flex items-center">
                <span className="text-orange-500 mr-1">My</span>
                <span className="text-blue-600">Store</span>
              </div>
            </div>
            
            <div className="flex flex-col items-center md:items-end">
              <div className="flex space-x-4 mb-2">
                <Link to="/terms" className="text-xs text-gray-600 hover:text-orange-500">Condições de Uso</Link>
                <Link to="/privacy" className="text-xs text-gray-600 hover:text-orange-500">Aviso de Privacidade</Link>
                <Link to="/cookies" className="text-xs text-gray-600 hover:text-orange-500">Cookies</Link>
              </div>
              <p className="text-xs text-gray-500">© 2023 MyStore.com, Inc. ou suas afiliadas</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;