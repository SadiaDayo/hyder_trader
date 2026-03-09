import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useToast } from "../context/ToastContext";
import { products } from "../pages/Products";
import "../styles/ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, cart } = useContext(AppContext);
  const { addToast } = useToast();

  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const product = products.find((p) => p.id === Number(id));

  const [quantity, setQuantity] = useState(1);
  const [reviewName, setReviewName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [productReviews, setProductReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/reviews/product/${id}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setProductReviews(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Reviews fetch failed:", err);
        addToast("Could not load reviews", "error", 3000);
        setProductReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [id, API_BASE, addToast]);

  const cartItem = cart.find((item) => item.id === Number(id));
  const cartQty = cartItem ? cartItem.quantity || 0 : 0;

  const maxQty = product?.stockQty ?? 0;
  const isOutOfStock = !product?.inStock || maxQty <= 0;
  const remainingStock = Math.max(maxQty - cartQty, 0);

  useEffect(() => {
    if (!product) return;
    if (isOutOfStock || remainingStock <= 0) {
      setQuantity(1);
      return;
    }
    setQuantity((q) => Math.min(q, remainingStock));
  }, [product, isOutOfStock, remainingStock]);

  if (!product) {
    return (
      <div className="not-found">
        <h2>Product not found</h2>
        <Link to="/shop">Back to Shop</Link>
      </div>
    );
  }

  const averageRating =
    productReviews.length > 0
      ? (productReviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) /
          productReviews.length
        ).toFixed(1)
      : "—";

  const handleAddToCart = () => {
    if (isOutOfStock) {
      addToast("Out of stock", "warning", 3000);
      return;
    }
    if (remainingStock <= 0) {
      addToast("Stock limit reached in cart", "warning", 3000);
      return;
    }
    if (quantity > remainingStock) {
      addToast(`Only ${remainingStock} available`, "warning", 3000);
      setQuantity(remainingStock);
      return;
    }
    addToCart({ ...product, quantity });
    addToast(`Added ${quantity} × ${product.name}`, "success", 3500);
  };

  const handleReviewSubmit = async () => {
    const trimmedName = reviewName.trim();
    const trimmedComment = comment.trim();

    if (!trimmedName) return addToast("Name required", "warning", 3000);
    if (rating === 0) return addToast("Select rating", "warning", 3000);
    if (!trimmedComment) return addToast("Comment required", "warning", 3000);

    try {
      const res = await fetch(`${API_BASE}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: Number(id),
          productName: product.name,
          name: trimmedName,
          rating: Number(rating),
          comment: trimmedComment,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        addToast(data.message || "Submit failed", "error", 3000);
        return;
      }

      if (data.review) {
        setProductReviews((prev) => [data.review, ...prev]);
      }

      setReviewName("");
      setRating(0);
      setComment("");
      addToast("Review submitted!", "success", 4000);
    } catch (err) {
      console.error("Submit error:", err);
      addToast("Server error", "error", 3000);
    }
  };

  return (
    <div className="product-detail-container">
      {/* Product main section - unchanged */}
      <div className="product-main">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-content">
          <h1>{product.name}</h1>
          <p className="description">{product.description || "No description available."}</p>
          <div className="meta">
            <span>Brand: <strong>{product.company || "—"}</strong></span>
            <span>Category: <strong>{product.category || "—"}</strong></span>
          </div>
          <div className="price-rating">
            <div className="price">PKR {product.price.toLocaleString("en-PK")}</div>
            <div className="rating-display">{averageRating} ★ {productReviews.length} reviews</div>
          </div>
          <div className="stock-row">
            <span className={`stock-badge ${isOutOfStock ? "out" : "in"}`}>
              {isOutOfStock ? "Out of Stock" : "In Stock"}
            </span>
            <span className="stock-qty">Total Stock: <b>{maxQty}</b></span>
            {!isOutOfStock && (
              <span className="stock-qty">Available to Add: <b>{remainingStock}</b></span>
            )}
          </div>
          <div className="actions">
            <div className="quantity">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={isOutOfStock || remainingStock <= 0}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => Math.min(remainingStock, q + 1))} disabled={isOutOfStock || remainingStock <= 0}>+</button>
            </div>
            <button className={`add-cart ${isOutOfStock || remainingStock <= 0 ? "disabled" : ""}`} onClick={handleAddToCart} disabled={isOutOfStock || remainingStock <= 0}>
              {isOutOfStock ? "Out of Stock" : remainingStock <= 0 ? "Stock Limit Reached" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>

      {/* Reviews section */}
      <div className="reviews-section">
        <h2>Customer Reviews ({productReviews.length})</h2>

        <div className="review-form">
          <h3>Write a Review</h3>
          <input type="text" placeholder="Your name" value={reviewName} onChange={e => setReviewName(e.target.value)} />
          <div className="rating-select">
            <label>Rating:</label>
            <select value={rating} onChange={e => setRating(Number(e.target.value))}>
              <option value={0}>Select...</option>
              {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} ★{'★'.repeat(n-1)}</option>)}
            </select>
          </div>
          <textarea placeholder="Your thoughts..." value={comment} onChange={e => setComment(e.target.value)} rows={4} />
          <button onClick={handleReviewSubmit} className="submit-review">Submit Review</button>
        </div>

        <div className="reviews-list">
          {loading ? (
            <p>Loading reviews...</p>
          ) : productReviews.length === 0 ? (
            <p>No reviews yet. Be the first!</p>
          ) : (
            productReviews.map(review => (
              <div key={review.id} className="review-item">
                <div className="review-header">
                  <div className="review-user-block">
                    <strong>{review.name || "Anonymous"}</strong>
                    <span className="stars">{"★".repeat(Number(review.rating))}{"☆".repeat(5 - Number(review.rating))}</span>
                  </div>
                  <span className="date">{review.date}</span>
                </div>
                <p>{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;