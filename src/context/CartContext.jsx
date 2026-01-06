import { createContext, useContext, useState, useEffect } from 'react';

// Create Context
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // 1. Initialize State (Load from LocalStorage)
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('userCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 2. Persistence (Save to LocalStorage)
  useEffect(() => {
    localStorage.setItem('userCart', JSON.stringify(cartItems));
  }, [cartItems]);


  // Add Item (Max 10 per item)
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        if (existingItem.quantity >= 10) {
          alert(`You cannot add more than 10 of ${product.title}`);
          return prevItems;
        }
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove Item
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  // Update Quantity (Increase / Decrease)
  const updateQuantity = (productId, type) => {
    setCartItems((prevItems) => 
      prevItems.map((item) => {
        if (item.id === productId) {
          if (type === 'increase') {
            if (item.quantity >= 10) {
              alert("Max quantity is 10");
              return item;
            }
            return { ...item, quantity: item.quantity + 1 };
          }
          if (type === 'decrease') {
            return { ...item, quantity: Math.max(1, item.quantity - 1) };
          }
        }
        return item;
      })
    );
  };

  // NEW: Clear Cart (For Checkout)
  const clearCart = () => {
    setCartItems([]);
  };

  // --- CALCULATIONS ---
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart, // <--- Exported here
        cartTotal, 
        cartCount 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
//eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);