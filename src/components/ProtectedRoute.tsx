import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
 
  const token = Cookies.get('Bearer');


  if (!token) {
    
    return <Navigate to="/auth/login" replace />;
  }

  
  return children;
};

export default ProtectedRoute;
