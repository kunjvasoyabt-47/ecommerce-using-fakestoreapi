import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { getAllProducts } from '../../services/api';
import './Home.scss';

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
      <Navbar />
      <main className="home-container">
        <section className="hero-section">
          
          {/* Left Text */}
          <div className="hero-content">
            <h1>Summer styles are finally here</h1>
            <p>
              This year, our new summer collection will shelter you from the harsh elements of a world that doesn't care if you live or die.
            </p>
            <button className="btn-primary">View all Collection</button>
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