import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import './styles/main.scss';
import { ROUTES } from './services/routes';   
function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
          <Route path={ROUTES.PRODUCTS} element={<Products />} />
          
      
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;