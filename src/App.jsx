import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import './styles/main.scss';
import { ROUTES } from './services/routes';  
import Navbar from './components/Navbar/Navbar'; 
import { AuthProvider } from './context/AuthContext';
import ProductDetails from './pages/ProductDetails/ProductDetails';
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
          <Route path={ROUTES.PRODUCTS} element={<Products />} />
          <Route path={ROUTES.PRODUCT_DETAILS} element={<ProductDetails />} />
          
        </Routes>
      </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;