import { Link, useNavigate } from 'react-router-dom'; // 1. Added useLocation
import { useTheme } from '../../context/ThemeContext';
import { FiSun, FiMoon, FiShoppingCart } from 'react-icons/fi'; // 2. Added Cart Icon
import './Navbar.scss';
import { ROUTES } from '../../services/routes';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext'; // 3. Added Cart Context


const Navbar = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { token, logout } = useAuth();
<<<<<<< Updated upstream
=======
  const { cartCount } = useCart(); // 4. Get Cart Count

>>>>>>> Stashed changes

  const handleLogout = () => {
    logout(); 
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

       
        <div className="nav-right">         
          {/* --- NEW: CART ICON (Only visible if Logged In) --- */}
          {token && (
            <Link to={ROUTES.CART} className="cart-icon-btn" title="View Cart">
              <FiShoppingCart size={20} />
              {/* Show Red Badge if items exist */}
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          )}

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