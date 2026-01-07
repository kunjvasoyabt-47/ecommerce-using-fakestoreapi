import { Navigate } from 'react-router-dom';
import { ROUTES } from '../../services/routes';

const AdminRoute = ({ children }) => {
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  if (user.role !== 'admin') {
    return <Navigate to={ROUTES.HOME} replace />;
  }
  return children;
};
export default AdminRoute;