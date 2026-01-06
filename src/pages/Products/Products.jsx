import { useEffect, useState } from 'react';
import { getAllProducts } from '../../services/product';
import { FiSearch } from 'react-icons/fi';
import './Products.scss';
import Loader from '../../components/Loader/Loader';
import ProductCard from '../../components/ProductCard/ProductCard';

const Products = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    maxPrice: 1000, 
  });
  const [inputValue, setInputValue] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [priceBounds, setPriceBounds] = useState({ min: 0, max: 1000 });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getAllProducts();
        const data = response.data;
        setProducts(data);

        if (data.length > 0) {
          const prices = data.map(p => p.price);
          const max = Math.ceil(Math.max(...prices));
          const min = Math.floor(Math.min(...prices));
          setPriceBounds({ min, max });
          setFilters(prev => ({ ...prev, maxPrice: max }));
        }

      } catch (err) {
        console.error(err);
        setError('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearch(inputValue);
    }, 500);

    return () => {  clearTimeout(timerId);  };
  }, [inputValue]);


  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearchInput = (e) => {
    setInputValue(e.target.value);
  };

  const categories = ["all", ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter((product) => {
    const matchCategory = filters.category === 'all' || product.category === filters.category;
    const matchPrice = product.price <= filters.maxPrice;
    const matchSearch = product.title.toLowerCase().includes(debouncedSearch.toLowerCase());
    
    return matchCategory && matchPrice && matchSearch;
  });

  if (loading) return <Loader />;
  if (error) return <div className="error-state">{error}</div>;

  return (
    <div className="products-page">
      <div className="container">
        <h2>Our Products</h2>
        
        <div className="controls-container">
          
          <div className="filters-row">
            {/* 1. Category Buttons */}
            <div className="filter-group category-group">
              <h3>Categories</h3>
              <div className="category-buttons">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleFilterChange('category', cat)}
                    className={`filter-btn ${filters.category === cat ? 'active' : ''}`}
                  >
                    {cat.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Price Slider */}
            <div className="filter-group price-group">
              <h3>Max Price: ${filters.maxPrice}</h3>
              <div className="price-slider-wrapper">
                <span className="price-label">${priceBounds.min}</span>
                <input 
                  type="range" 
                  min={priceBounds.min} 
                  max={priceBounds.max} 
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', Number(e.target.value))}
                  className="price-slider"
                />
                <span className="price-label">${priceBounds.max}</span>
              </div>
            </div>
          </div>

          {/* 3. Search Bar (Moved Below Price Slider) */}
          <div className="search-container">
            <div className="search-input-wrapper">
              <span className="search-icon">
                <FiSearch size={20} />
              </span>
              <input 
                type="text" 
                placeholder="Search products..." 
                value={inputValue} 
                onChange={handleSearchInput}
                className="search-input"
              />
            </div>
          </div>
        </div>

        {/* --- PRODUCT GRID --- */}
        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="no-results">
              <p>No products found.</p>
              <button 
                className="btn-reset"
                onClick={() => {
                  setFilters({ category: 'all', maxPrice: priceBounds.max });
                  setInputValue(''); 
                  setDebouncedSearch('');
                }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;