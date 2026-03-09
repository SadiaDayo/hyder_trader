import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { AppContext } from "../context/AppContext";
import { useToast } from "../context/ToastContext";
import { products } from "../pages/Products";
import "../styles/Shop.css";

const Shop = () => {
  const { searchQuery, setSearchQuery } = useContext(AppContext);
  const { addToast } = useToast();
  const location = useLocation();
  const API_URL = process.env.REACT_APP_API_URL;

  const [filtered, setFiltered] = useState(products);
  const [allReviews, setAllReviews] = useState([]);

  const companies = [
    "All",
    "Itel",
    "Sofar",
    "Growatt",
    "Inverex",
    "Longi",
    "Jinko",
    "Trina",
    "Huawei",
    "Generic",
  ];

  const categories = ["All", "Solar Panels", "Inverters", "Batteries", "Electronics"];

  const [selectedCompany, setSelectedCompany] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [saleOnly, setSaleOnly] = useState(false);

  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        if (!API_URL) return;
        const res = await fetch(`${API_URL}/api/reviews`);
        const data = await res.json();
        setAllReviews(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
        setAllReviews([]);
      }
    };

    fetchAllReviews();
  }, [API_URL]);

  const getAverageRating = (productId) => {
    const productReviews = allReviews.filter((r) => r.productId === productId);

    if (productReviews.length === 0) return 0;

    const total = productReviews.reduce((sum, r) => sum + Number(r.rating || 0), 0);
    return (total / productReviews.length).toFixed(1);
  };

  const getReviewCount = (productId) => {
    return allReviews.filter((r) => r.productId === productId).length;
  };

  const renderStars = (productId) => {
    const avgRating = Number(getAverageRating(productId));
    const reviewCount = getReviewCount(productId);

    const full = Math.floor(avgRating);
    const half = avgRating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);

    return (
      <span className="stars">
        {"★".repeat(full)}
        {half && "½"}
        {"☆".repeat(empty)}
        <small style={{ marginLeft: "6px", color: "#777" }}>
          (
          {reviewCount > 0
            ? `${avgRating} • ${reviewCount} review${reviewCount > 1 ? "s" : ""}`
            : "No reviews"}
          )
        </small>
      </span>
    );
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlCompany = params.get("company");
    const urlCategory = params.get("category");
    const urlSearch = params.get("search") || "";
    const urlSale = params.get("sale") === "true";

    setSelectedCompany(urlCompany || "All");
    setSelectedCategory(urlCategory || "All");
    setSaleOnly(urlSale);

    if (urlSearch) {
      setSearchQuery(urlSearch);
    } else {
      setSearchQuery("");
    }

    let list = products;

    const companyToUse = urlCompany || "All";
    const categoryToUse = urlCategory || "All";

    if (companyToUse !== "All") {
      list = list.filter((p) => p.company === companyToUse);
    }

    if (categoryToUse !== "All") {
      list = list.filter((p) => p.category === categoryToUse);
    }

    if (urlSearch) {
      const q = urlSearch.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.company.toLowerCase().includes(q) ||
          (p.description || "").toLowerCase().includes(q)
      );
    }

    if (inStockOnly) {
      list = list.filter((p) => p.inStock === true && (p.stockQty ?? 0) > 0);
    }

    if (urlSale) {
      list = list.filter(
        (p) => p.deal === true || ((p.oldPrice ?? 0) > (p.price ?? 0))
      );
    }

    if (sortBy === "newest") {
      list = [...list].sort((a, b) => (b.id || 0) - (a.id || 0));
    } else if (sortBy === "priceLow") {
      list = [...list].sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === "priceHigh") {
      list = [...list].sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === "nameAZ") {
      list = [...list].sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    }

    setFiltered(list);
  }, [location.search, sortBy, inStockOnly, setSearchQuery]);

  const updateQueryParams = (newCompany, newCategory, newSale = saleOnly) => {
    const params = new URLSearchParams(location.search);

    if (newCompany && newCompany !== "All") {
      params.set("company", newCompany);
    } else {
      params.delete("company");
    }

    if (newCategory && newCategory !== "All") {
      params.set("category", newCategory);
    } else {
      params.delete("category");
    }

    if (newSale) {
      params.set("sale", "true");
    } else {
      params.delete("sale");
    }

    if (!params.get("search")) {
      params.delete("search");
    }

    const newUrl = params.toString() ? `/shop?${params.toString()}` : "/shop";
    window.history.replaceState({}, document.title, newUrl);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const clearFilters = () => {
    setSelectedCompany("All");
    setSelectedCategory("All");
    setSearchQuery("");
    setSortBy("default");
    setInStockOnly(false);
    setSaleOnly(false);

    window.history.replaceState({}, document.title, "/shop");
    window.dispatchEvent(new PopStateEvent("popstate"));

    setFiltered(products);
    addToast("Filters cleared – showing all products", "success", 2000);
  };

  const hasActiveFilters =
    selectedCompany !== "All" ||
    selectedCategory !== "All" ||
    !!searchQuery ||
    inStockOnly ||
    saleOnly ||
    sortBy !== "default";

  return (
    <div className="shop-page">
      <h1>Distributor Products</h1>

      <div className="shop-toolbar">
        <div className="toolbar-left">
          <p className="results-text">
            <i className="bi bi-grid-3x3-gap"></i>
            Showing <b>{filtered.length}</b> of <b>{products.length}</b> products
          </p>

          {hasActiveFilters && (
            <button className="clear-btn" onClick={clearFilters}>
              <i className="bi bi-x-circle"></i> Clear
            </button>
          )}
        </div>

        <div className="toolbar-right">
          <label className="stock-toggle">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
            />
            <span>In Stock</span>
          </label>

          <label className="stock-toggle">
            <input
              type="checkbox"
              checked={saleOnly}
              onChange={(e) => {
                const checked = e.target.checked;
                setSaleOnly(checked);
                updateQueryParams(selectedCompany, selectedCategory, checked);
              }}
            />
            <span>On Sale</span>
          </label>

          <div className="sort-wrap">
            <i className="bi bi-filter"></i>
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Sort: Default</option>
              <option value="newest">Newest</option>
              <option value="priceLow">Price: Low → High</option>
              <option value="priceHigh">Price: High → Low</option>
              <option value="nameAZ">Name: A → Z</option>
            </select>
          </div>
        </div>
      </div>

      <div className="filter-row">
        {companies.map((c) => (
          <button
            key={c}
            className={selectedCompany === c ? "active" : ""}
            onClick={() => {
              setSelectedCompany(c);
              updateQueryParams(c, selectedCategory, saleOnly);
            }}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="filter-row">
        {categories.map((cat) => (
          <button
            key={cat}
            className={selectedCategory === cat ? "active" : ""}
            onClick={() => {
              setSelectedCategory(cat);
              updateQueryParams(selectedCompany, cat, saleOnly);
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {filtered.length === 0 ? (
          <div className="no-results">
            <h3>No products found</h3>
            <button onClick={clearFilters}>Show All</button>
          </div>
        ) : (
          filtered.map((p) => (
            <div key={p.id} className="product-wrapper">
              <ProductCard product={p} />
              <div className="rating-below-card">{renderStars(p.id)}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Shop;