import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "../styles/Cart.css";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(AppContext);

  // Calculate totals (handles quantity correctly)
  const subtotal = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const shipping = 0; // change later if needed
  const total = subtotal + shipping;

  return (
    <div className="cart-container">
      <div className="cart-card">
        <h1>Your Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-icon">🛒</div>
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added any products yet.</p>
            <Link to="/shop" className="btn-shop-now">
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img
                      src={item.image || "https://via.placeholder.com/100"}
                      alt={item.name}
                    />
                  </div>

                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="price">PKR {item.price.toLocaleString()}</p>

                    <div className="quantity-control">
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))}
                        disabled={(item.quantity || 1) <= 1}
                      >
                        −
                      </button>

                      <span className="qty-display">{item.quantity || 1}</span>

                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="item-actions">
                    <p className="subtotal">
                      PKR {(item.price * (item.quantity || 1)).toLocaleString()}
                    </p>

                    <button
                      className="btn-remove"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>PKR {subtotal.toLocaleString()}</span>
              </div>

              <div className="summary-row">
                <span>Shipping</span>
                <span>PKR {shipping.toLocaleString()}</span>
              </div>

              <div className="summary-row grand-total">
                <span>Total</span>
                <span>PKR {total.toLocaleString()}</span>
              </div>

              <Link to="/checkout" className="btn-checkout">
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;