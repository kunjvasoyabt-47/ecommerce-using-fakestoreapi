import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../services/routes';
import './AdminNavbar.scss';

const AdminNavbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-nav-container">
        <div className="admin-brand">Admin Panel</div>
        
        <div className="admin-links">
          {/* TABS */}
          <Link to={ROUTES.ADMIN_PRODUCTS} className="admin-link">Products</Link>
          <Link to={ROUTES.ADMIN_USERS} className="admin-link">Users</Link>
        </div>

        <div className="admin-actions">
          {/* THE "VIEW AS USER" BUTTON */}
          <button 
            className="btn-view-user" 
            onClick={() => navigate(ROUTES.HOME)}
          >
            👁 View as User
          </button>
          
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;