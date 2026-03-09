import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import "../styles/WishList.css";
import { Link } from "react-router-dom";
const Wishlist = () => {
  const { wishlist } = useContext(AppContext);

  return (
    <div className="wishlist-page">
      <h2>Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>No items saved. <Link to="/shop">Shop Now</Link></p>
      ) : (
        <div className="products-grid">
          {wishlist.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
