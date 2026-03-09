import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "../styles/Checkout.css";

const Checkout = () => {
  const { cart, updateQuantity, clearCart } = useContext(AppContext);

  const [step, setStep] = useState("review"); // review → payment → success

  // Calculate totals (updates automatically when quantity changes)
  const subtotal = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const shipping = 0; // Free shipping for now – change later if needed
  const total = subtotal + shipping;

  const handlePlaceOrder = () => {
    setStep("payment");
  };

  const handleConfirmPayment = () => {
    // Clear the cart when user confirms they sent the payment receipt
    clearCart();
    setStep("success");
  };

  return (
    <div className="checkout-container">
      <div className="checkout-card">
        <h1>Checkout</h1>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty.</p>
            <Link to="/shop" className="btn-back">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Step 1: Review Order */}
            {step === "review" && (
              <div className="order-review">
                <h2>Your Order ({cart.length} item{cart.length !== 1 ? "s" : ""})</h2>

                <div className="cart-items">
                  {cart.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div className="item-preview">
                        <img src={item.image} alt={item.name} />
                      </div>

                      <div className="item-details">
                        <h4>{item.name}</h4>
                        <p className="brand">{item.company}</p>
                        <p className="price">PKR {item.price.toLocaleString()}</p>

                        <div className="quantity-control">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))}
                            disabled={(item.quantity || 1) <= 1}
                          >
                            −
                          </button>
                          <span>{item.quantity || 1}</span>
                          <button
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="item-total">
                        PKR {(item.price * (item.quantity || 1)).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="totals">
                  <div className="total-row">
                    <span>Subtotal</span>
                    <span>PKR {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="total-row">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="total-row grand-total">
                    <span>Total</span>
                    <span>PKR {total.toLocaleString()}</span>
                  </div>
                </div>

                <button className="btn-proceed" onClick={handlePlaceOrder}>
                  Proceed to Payment Instructions
                </button>
              </div>
            )}

            {/* Step 2: Payment Instructions */}
            {step === "payment" && (
              <div className="payment-instructions">
                <h2>Payment Instructions</h2>
                <p className="lead">
                  Thank you for your order! Please complete the payment using one of the methods below, then send the payment receipt to our WhatsApp number.
                </p>

                <div className="payment-methods">
                  <div className="method">
                    <h3>JazzCash / EasyPaisa</h3>
                    <p><strong>Number:</strong> +92 321 1234567</p>
                    <p><strong>Name:</strong> Hyder Traders</p>
                  </div>

                  <div className="method">
                    <h3>Bank Transfer</h3>
                    <p><strong>Bank:</strong> HBL / Meezan Bank</p>
                    <p><strong>Account Title:</strong> Hyder Traders</p>
                    <p><strong>Account Number:</strong> 0123-456789-01</p>
                    <p><strong>IBAN:</strong> PK12HBL00012345678901</p>
                  </div>
                </div>

                <div className="whatsapp-info">
                  <h3>After Payment</h3>
                  <p>
                    Please send your payment receipt / screenshot to our WhatsApp number:
                  </p>
                  <a
                    href="https://wa.me/923211234567" // ← REPLACE WITH YOUR REAL NUMBER
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whatsapp-btn"
                  >
                    Send Receipt on WhatsApp
                  </a>
                  <p className="note">
                    Once we verify your payment, we will confirm your order and dispatch it within 1–2 business days.
                  </p>
                </div>

                <button className="btn-confirm" onClick={handleConfirmPayment}>
                  I Have Sent the Payment Receipt
                </button>
              </div>
            )}

            {/* Step 3: Success Message */}
            {step === "success" && (
              <div className="order-success">
                <div className="success-icon">✓</div>
                <h2>Thank You!</h2>
                <p className="lead">
                  Your order has been received successfully.
                </p>
                <p>
                  We have noted your payment details. Our team will verify the transaction shortly and contact you on WhatsApp for confirmation.
                </p>
                <p className="order-note">
                  Order Total: <strong>PKR {total.toLocaleString()}</strong>
                </p>

                <div className="success-actions">
                  <Link to="/shop" className="btn-continue">
                    Continue Shopping
                  </Link>
                  <Link to="/" className="btn-home">
                    Back to Home
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;