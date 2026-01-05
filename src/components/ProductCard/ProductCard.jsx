import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.scss';


// Add isDetail prop (defaults to false)
const ProductCard = ({ product, isDetail = false }) => {
  const navigate = useNavigate();
  const { id, title, price, category, image, rating, description } = product;

  // Handler to go to details page (only if NOT already in detail view)
  const handleCardClick = () => {
    if (!isDetail) {
      navigate(`/products/${id}`);
    }
  };

  // Prevent navigation when clicking "Add to Cart"
  const handleAddToCart = (e) => {
    e.stopPropagation(); 
    console.log("Added to cart:", title);
  };

  return (
    <div 
      className={`product-card ${isDetail ? 'detail-view' : ''}`} 
      onClick={handleCardClick}
    >
      <div className="card-image">
        <img src={image} alt={title} />
      </div>

      <div className="card-content">
        <span className="category">{category}</span>
        
        {/* Conditional Rendering: Show full title in detail view, truncated in grid */}
        <h3 title={title}>
          {isDetail || title.length <= 50 ? title : title.substring(0, 50) + '...'}
        </h3>

        {/* Conditional Rendering: Show Description only in Detail View */}
        {isDetail && (
          <p className="description">{description}</p>
        )}

        <div className="card-footer">
          <span className="price">${price.toFixed(2)}</span>
          {rating && (
            <div className="rating">
              <span className="star">★</span>
              <span>{rating.rate} ({rating.count})</span>
            </div>
          )}
        </div>

        <button className="btn-add" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;