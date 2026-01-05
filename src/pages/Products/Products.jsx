import  { useEffect, useState } from 'react';
import { getAllProducts } from '../../services/product';
import './Products.scss';
import ProductCard from '../../components/ProductCard/ProductCard';


const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="loading-state">Loading products...</div>;
  if (error) return <div className="error-state">{error}</div>;

  return (

    <>  
    <div className="products-page">

      <div className="container">
        <h2>Our Products</h2>
        
        <div className="product-grid">
          {products.map((product) => (
            // Pass the entire product object to the card
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default Products;