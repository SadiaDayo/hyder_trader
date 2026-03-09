import React from "react";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import ProductCategories from "../components/FeaturedBrands";
import ProductCard from "../components/ProductCard";
import { products } from "./Products";
import "../styles/Home.css";

const Home = () => {
  const dealProducts = products.filter(
    (product) =>
      product.deal === true ||
      (product.oldPrice && product.oldPrice > product.price)
  );

  const bestSellerProducts = products.filter(
    (product) => product.bestSeller === true
  );
  const popularProducts = products.filter(
    (product) => product.popular === true
  );
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="home">
      <Banner />

      <section className="section home-highlight-section deals-section">
        <div className="section-header-row">
          <div>
            <h2>Deals of the Day</h2>
            <p>Special discounted products for smart buyers</p>
          </div>

          <Link to="/shop?sale=true" className="view-all-btn">
  View All
</Link>
        </div>

        <div className="products-grid">
          {dealProducts.slice(0, 4).map((prod) => (
            <div key={prod.id} className="home-product-wrap">
              <ProductCard product={prod} />
            </div>
          ))}
        </div>
      </section>

      <section className="section home-highlight-section">
        <div className="section-header-row">
          <div>
            <h2>Best Sellers</h2>
            <p>Most trusted and most purchased products</p>
          </div>
        </div>

        <div className="products-grid">
          {bestSellerProducts.slice(0, 4).map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      <section className="section home-highlight-section">
        <div className="section-header-row">
          <div>
            <h2>Popular Products</h2>
            <p>Trending products customers love</p>
          </div>
        </div>

        <div className="products-grid">
          {popularProducts.slice(0, 4).map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      <section className="section">
        <ProductCategories />
      </section>

      <section className="section home-highlight-section">
        <div className="section-header-row">
          <div>
            <h2>Featured Products</h2>
            <p>Explore premium solar, battery, inverter and electronics products</p>
          </div>
        </div>

        <div className="products-grid">
          {featuredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;