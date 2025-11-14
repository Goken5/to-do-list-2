import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {

  const userEmail = localStorage.getItem('userEmail');
  const userName = localStorage.getItem('userName');
  const navigate = useNavigate();

  if (!userEmail || !userName) {
    toast.error("Você precisa estar logado para acessar essa página.");
    navigate("/login");
  }
  
  return <>{children}</>;
}