import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import type { ReactNode } from 'react';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { token, loading } = useAuth();

  if (loading) return <div className="text-center p-4">Carregando...</div>;

  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
