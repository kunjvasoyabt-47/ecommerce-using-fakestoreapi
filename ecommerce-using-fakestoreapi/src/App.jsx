import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import './styles/main.scss';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Placeholder Routes */}
          <Route path="/products" element={<Home />} />
          <Route path="/stores" element={<Home />} />
          <Route path="/about" element={<Home />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;