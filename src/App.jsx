import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// --- Context Providers ---
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// --- Services ---
import { ROUTES } from './services/routes'; 

// --- Layouts (The Solution for the Loop) ---
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';

// --- Pages ---
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Cart from './components/Cart/Cart';

// --- Admin Pages ---
// Note: Using the path from your folder structure
import AdminProducts from './pages/Admin/AdminProduct/AdminProduct';

// --- Styles ---
import './styles/main.scss';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Router>         
            <Routes>

              <Route element={<UserLayout />}>
                <Route path={ROUTES.HOME} element={<Home />} />
                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route path={ROUTES.REGISTER} element={<Register />} />
                <Route path={ROUTES.PRODUCTS} element={<Products />} />
                <Route path={ROUTES.PRODUCT_DETAILS} element={<ProductDetails />} />
                <Route path={ROUTES.CART} element={<Cart />} />
              </Route>

              <Route element={<AdminLayout />}>
                <Route path={ROUTES.ADMIN_PRODUCTS} element={<AdminProducts />} />
                {/* You can add AdminUsers here later */}
              </Route>

            </Routes>

          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;