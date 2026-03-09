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

  const product = products.find((p) => p.id === Number(id));

  const [quantity, setQuantity] = useState(1);
  const [reviewName, setReviewName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [productReviews, setProductReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const API_URL = process.env.REACT_APP_API_URL;
        const res = await fetch(`${API_URL}/api/reviews/${id}`);
        const data = await res.json();
        setProductReviews(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
        setProductReviews([]);
      }
    };

    if (id) {
      fetchReviews();
    }
  }, [id]);

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
      ? (
          productReviews.reduce((sum, r) => sum + r.rating, 0) /
          productReviews.length
        ).toFixed(1)
      : "—";

  const handleAddToCart = () => {
    if (isOutOfStock) {
      addToast("This product is currently out of stock", "warning", 3000);
      return;
    }

    if (remainingStock <= 0) {
      addToast("You already added all available stock to cart", "warning", 3000);
      return;
    }

    if (quantity > remainingStock) {
      addToast(`Only ${remainingStock} more item(s) available`, "warning", 3000);
      setQuantity(remainingStock);
      return;
    }

    addToCart({ ...product, quantity });
    addToast(`Added ${quantity} × ${product.name} to cart`, "success", 3500);
  };

  const handleReviewSubmit = async () => {
    if (!reviewName.trim()) {
      addToast("Please enter your name", "warning", 3000);
      return;
    }

    if (rating === 0) {
      addToast("Please select a rating", "warning", 3000);
      return;
    }

    if (!comment.trim()) {
      addToast("Please write a review comment", "warning", 3000);
      return;
    }

    try {
      const API_URL = process.env.REACT_APP_API_URL;
      const res = await fetch(`${API_URL}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: Number(id),
          productName: product.name,
          name: reviewName,
          rating,
          comment,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        addToast(data.message || "Failed to submit review", "error", 3000);
        return;
      }

      if (data.review) {
        setProductReviews((prev) => [data.review, ...prev]);
      }

      setReviewName("");
      setRating(0);
      setComment("");
      addToast("Review submitted successfully", "success", 4000);
    } catch (error) {
      console.error("Review submit error:", error);
      addToast("Server error while saving review", "error", 3000);
    }
  };

  return (
    <div className="product-detail-container">
      <div className="product-main">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-content">
          <h1>{product.name}</h1>

          <p className="description">
            {product.description || "No description available."}
          </p>

          <div className="meta">
            <span>
              Brand: <strong>{product.company || "—"}</strong>
            </span>
            <span>
              Category: <strong>{product.category || "—"}</strong>
            </span>
          </div>

          <div className="price-rating">
            <div className="price">
              PKR {product.price.toLocaleString("en-PK")}
            </div>

            <div className="rating-display">
              {averageRating} ★ {productReviews.length} reviews
            </div>
          </div>

          <div className="stock-row">
            <span className={`stock-badge ${isOutOfStock ? "out" : "in"}`}>
              {isOutOfStock ? "Out of Stock" : "In Stock"}
            </span>

            <span className="stock-qty">
              Total Stock: <b>{maxQty}</b>
            </span>

            {!isOutOfStock && (
              <span className="stock-qty">
                Available to Add: <b>{remainingStock}</b>
              </span>
            )}
          </div>

          <div className="actions">
            <div className="quantity">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={isOutOfStock || remainingStock <= 0}
              >
                -
              </button>

              <span>{quantity}</span>

              <button
                onClick={() =>
                  setQuantity((q) => {
                    if (isOutOfStock || remainingStock <= 0) return 1;
                    return Math.min(remainingStock, q + 1);
                  })
                }
                disabled={isOutOfStock || remainingStock <= 0}
              >
                +
              </button>
            </div>

            <button
              className={`add-cart ${isOutOfStock || remainingStock <= 0 ? "disabled" : ""}`}
              onClick={handleAddToCart}
              disabled={isOutOfStock || remainingStock <= 0}
            >
              {isOutOfStock
                ? "Out of Stock"
                : remainingStock <= 0
                ? "Stock Limit Reached"
                : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>

      <div className="reviews-section">
        <h2>Customer Reviews ({productReviews.length})</h2>

        <div className="review-form">
          <h3>Write a Review</h3>

          <input
            type="text"
            className="review-name-input"
            placeholder="Enter your name"
            value={reviewName}
            onChange={(e) => setReviewName(e.target.value)}
          />

          <div className="rating-select">
            <label>Rating:</label>

            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              <option value={0}>Select...</option>
              <option value={5}>5 ★★★★★</option>
              <option value={4}>4 ★★★★☆</option>
              <option value={3}>3 ★★★☆☆</option>
              <option value={2}>2 ★★☆☆☆</option>
              <option value={1}>1 ★☆☆☆☆</option>
            </select>
          </div>

          <textarea
            placeholder="Share your thoughts about this product..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
          />

          <button onClick={handleReviewSubmit} className="submit-review">
            Submit Review
          </button>
        </div>

        <div className="reviews-list">
          {productReviews.length === 0 ? (
            <p>No reviews yet. Be the first to review!</p>
          ) : (
            productReviews.map((review) => (
              <div
                key={review.id || `${review.date}-${review.comment}`}
                className="review-item"
              >
                <div className="review-header">
                  <div className="review-user-block">
                    <strong className="reviewer-name">
                      {review.name || "Anonymous User"}
                    </strong>
                    <span className="stars">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </span>
                  </div>

                  <span className="date">{review.date || "—"}</span>
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