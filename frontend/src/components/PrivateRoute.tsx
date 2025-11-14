import { useNavigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {

  const userEmail = localStorage.getItem('userEmail');
  const userName = localStorage.getItem('userName');
  const navigate = useNavigate();

  if (!userEmail || !userName) {
    navigate("/login");
  }
  
  return <>{children}</>;
}