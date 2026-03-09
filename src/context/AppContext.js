import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Cart with quantity support
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      const stockQty = product.stockQty ?? 0;
      const addQty = product.quantity ?? 1;

      if (!product.inStock || stockQty <= 0) {
        return prev;
      }

      if (existing) {
        const currentQty = existing.quantity || 1;
        const newQty = Math.min(currentQty + addQty, stockQty);

        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: newQty }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: Math.min(addQty, stockQty),
        },
      ];
    });
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setCart((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        const stockQty = item.stockQty ?? 0;
        const safeQty = Math.min(newQuantity, stockQty || newQuantity);

        return { ...item, quantity: safeQty };
      })
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  // Wishlist - no duplicates
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (prev.some((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  // Reviews
  const [reviews, setReviews] = useState({});

  const addReview = (productId, review) => {
    setReviews((prev) => ({
      ...prev,
      [productId]: prev[productId] ? [...prev[productId], review] : [review],
    }));
  };

  // Global search state
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        reviews,
        addReview,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};