import { useEffect, useState } from 'react';
import { getAllProducts } from '../../services/api';
import './Home.scss';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../services/routes'; 

const Home = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch 7 products to fill our image grid
    getAllProducts().then(res => {
      setImages(res.data.slice(0,7)); 
    }).catch(err => console.error(err));
  }, []);

  return (
    <>
      <main className="home-container">
        <section className="hero-section">
          
          {/* Left Text */}
          <div className="hero-content">
            <h1>Winter styles are finally here</h1>
            <p>
              Upgrade your wardrobe with our newest arrivals. Perfect for layering, built for comfort, and ready for whatever winter throws your way.
            </p>
            <button className="btn-primary" ><Link to={ROUTES.PRODUCTS}>View all Collection</Link></button>
          </div>

          {/* Right Image Grid */}
          <div className="hero-visuals">
            <div className="masonry-grid">
              {images.map((prod, idx) => (
                <div key={prod.id} className={`grid-item item-${idx}`}>
                  <img src={prod.image} alt="Summer Style" />
                </div>
              ))}
            </div>
          </div>

        </section>
      </main>
    </>
  );
};

export default Home;