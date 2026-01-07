import { useEffect, useState } from 'react';
import { getAllProducts } from '../../services/product';
import { FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './Products.scss';
import Loader from '../../components/Loader/Loader';
import ProductCard from '../../components/ProductCard/ProductCard';

const Products = () => {

  const ITEMS_PER_PAGE = 6;
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
  const [currentPage, setCurrentPage] = useState(1);

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

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, debouncedSearch]);


  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearchInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const categories = ["all", ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter((product) => {
    const matchCategory = filters.category === 'all' || product.category === filters.category;
    const matchPrice = product.price <= filters.maxPrice;
    const matchSearch = product.title.toLowerCase().includes(debouncedSearch.toLowerCase());
    
    return matchCategory && matchPrice && matchSearch;
  });

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

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
                    className={`filter-btn ${filters.category === cat && 'active' }`}
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

          {/* 3. Search Bar */}
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
          {/* UPDATED: Map over 'currentProducts' instead of 'filteredProducts' */}
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
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

        {/* 7. ADDED: Pagination Controls */}
        {/* Only show if we have filtered items */}
        {filteredProducts.length > 0 && (
          <div className="pagination-controls">
            <button 
              className="page-btn" 
              onClick={handlePrevPage} 
              disabled={currentPage === 1}
            >
              <FiChevronLeft /> Prev
            </button>

            <span className="page-info">
              {currentPage} of {totalPages}
            </span>

            <button 
              className="page-btn" 
              onClick={handleNextPage} 
              disabled={currentPage === totalPages}
            >
              Next <FiChevronRight />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Products;