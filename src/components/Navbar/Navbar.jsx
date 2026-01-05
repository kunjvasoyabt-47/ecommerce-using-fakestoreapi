import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi'; // Import clean Feather icons
import './Navbar.scss';
import { ROUTES } from '../../services/routes';

const Navbar = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  // eslint-disable-next-line react-refresh/only-export-components
  const token = localStorage.getItem('userToken');

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate(ROUTES.LOGIN);
  };

  return (
    <header className="site-header">
      <nav className="navbar">
        {/* LEFT SIDE: Logo + Links */}
        <div className="nav-left">
          <Link to="/" className="logo-mark">∞</Link>
          <ul className="nav-links">
            <li><Link to={ROUTES.HOME}>Home</Link></li>
            <li><Link to={ROUTES.PRODUCTS}>Product</Link></li>
            <li><Link to={ROUTES.ABOUT}>About Us</Link></li>
          </ul>
        </div>

        {/* RIGHT SIDE: Theme Icon + Auth Buttons */}
        <div className="nav-right">
          {/* Circular Theme Button */}
          <button 
            onClick={toggleTheme} 
            className="theme-icon-btn"
            title="Toggle Light/Dark Mode"
          >
            {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
          </button>

          <div className="auth-buttons">
            {token ? (
              <button onClick={handleLogout} className="btn-logout">Logout</button>
            ) : (
              <>
                <Link to={ROUTES.LOGIN} className="btn-login">Login</Link>
                <Link to={ROUTES.REGISTER} className="btn-signup">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;