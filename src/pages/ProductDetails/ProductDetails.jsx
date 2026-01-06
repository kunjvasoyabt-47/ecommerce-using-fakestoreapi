import  { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { getProductById } from '../../services/product';
import ProductCard from '../../components/ProductCard/ProductCard';
import './ProductDetails.scss';

const ProductDetails = () => {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        setProduct(response.data);
      } catch (err) {
        console.error("Error loading product details:", err);
        setError('Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) return <div className="loading-state">Loading details...</div>;
  if (error) return <div className="error-state">{error}</div>;
  if (!product) return <div className="error-state">Product not found</div>;

  return (
    <div className="product-details-page">
      <div className="container">
        
        {/* Back Button */}
        <button className="btn-back" onClick={() => navigate(-1)}>
           &larr; Back to Products
        </button>

        <ProductCard product={product} isDetail={true} />
      
      </div>
    </div>
  );
};

export default ProductDetails;