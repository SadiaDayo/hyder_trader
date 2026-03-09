import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useToast } from "../context/ToastContext";
import "../styles/ProductCard.css";

const ProductCard = ({ product }) => {
  const {
    cart,
    wishlist,
    addToCart,
    removeFromCart,
    addToWishlist,
    removeFromWishlist,
  } = useContext(AppContext);

  const { addToast } = useToast();
  const [hovered, setHovered] = useState(false);

  const cartItem = cart.find((item) => item.id === product.id);
  const cartQty = cartItem ? cartItem.quantity || 1 : 0;

  const inCart = !!cartItem;
  const inWishlist = wishlist.some((item) => item.id === product.id);

  const availableStock = product.stockQty ?? 0;
  const isOutOfStock = !product.inStock || availableStock <= 0;
  const isMaxStockReached = cartQty >= availableStock && !isOutOfStock;

  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const saveAmount = hasDiscount ? product.oldPrice - product.price : 0;

  const toggleCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isOutOfStock) {
      addToast("This product is currently out of stock", "warning", 2500);
      return;
    }

    if (inCart) {
      removeFromCart(product.id);
      addToast(`Removed ${product.name} from cart`, "info", 3000);
      return;
    }

    if (isMaxStockReached) {
      addToast(`Only ${availableStock} item(s) available in stock`, "warning", 2500);
      return;
    }

    addToCart(product);
    addToast(`Added ${product.name} to cart`, "success", 3000);
  };

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (inWishlist) {
      removeFromWishlist(product.id);
      addToast(`Removed ${product.name} from wishlist`, "info", 2500);
    } else {
      addToWishlist(product);
      addToast(`Added ${product.name} to wishlist`, "success", 2500);
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card-link">
      <div
        className={`product-card ${isOutOfStock ? "out-stock-card" : ""}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="product-image">
          <div className="top-badges">
            <span className={`stock-badge ${isOutOfStock ? "out" : "in"}`}>
              {isOutOfStock
                ? "Sold Out"
                : `In Stock (${Math.max(availableStock - cartQty, 0)})`}
            </span>

            {product.badge && (
              <span className="product-badge">{product.badge}</span>
            )}
          </div>

          <button
            className={`wishlist-btn ${inWishlist ? "active" : ""}`}
            onClick={toggleWishlist}
            title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            {inWishlist ? "❤️" : "♡"}
          </button>

          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-info">
          <h3>{product.name}</h3>
          <p className="brand">{product.company}</p>

          <div className="product-price-block">
            {hasDiscount && (
              <p className="old-price">
                PKR {product.oldPrice.toLocaleString("en-PK")}
              </p>
            )}

            <p className="price">
              PKR {product.price.toLocaleString("en-PK")}
            </p>

            {hasDiscount && (
              <p className="save-price">
                Save PKR {saveAmount.toLocaleString("en-PK")}
              </p>
            )}
          </div>

          <button
            className={`add-cart-btn ${hovered || inCart ? "visible" : ""} ${
              (isOutOfStock || isMaxStockReached) && !inCart ? "disabled" : ""
            }`}
            onClick={toggleCart}
            disabled={(isOutOfStock || isMaxStockReached) && !inCart}
          >
            {inCart
              ? "Remove from Cart"
              : isOutOfStock
              ? "Out of Stock"
              : isMaxStockReached
              ? "Stock Limit Reached"
              : "Add to Cart"}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;