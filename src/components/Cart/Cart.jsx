import { FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { ROUTES } from '../../services/routes';
import './Cart.scss';

const Cart = () => {
  // 1. Destructure clearCart from context
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  // 2. Handle Checkout Logic
  const handleCheckout = () => {
    if (cartItems.length === 0) return;
      // Logic: Clear cart -> Alert -> Go Home
      clearCart();
      alert("Order placed successfully! Thank you for shopping.");
      navigate(ROUTES.HOME);
    
  };

  // 3. Empty State View
  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate(ROUTES.PRODUCTS)}>Shop Now</button>
      </div>
    );
  }

  // 4. Cart View
  return (
    <div className="cart-page">
      <h2>Shopping Cart ({cartItems.length} items)</h2>
      
      <div className="cart-container">
        
        {/* Left Side: Items */}
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="image-wrapper">
                <img src={item.image} alt={item.title} />
              </div>
              
              <div className="item-details">
                <h3>{item.title}</h3>
                <p className="price">${item.price}</p>
                <button 
                className="btn-remove"
                onClick={() => removeFromCart(item.id)}
                title="Remove Item" // Adds a tooltip on hover
              ></button>
              </div>

              <div className="quantity-controls">
                <button onClick={() => updateQuantity(item.id, 'decrease')}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 'increase')}>+</button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Summary */}
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Total Amount</span>
            <span className="total-price">${cartTotal.toFixed(2)}</span>
          </div>
          
          <button className="btn-checkout" onClick={handleCheckout}>
            Checkout
          </button>
        </div>

      </div>
    </div>
  );
};

export default Cart;