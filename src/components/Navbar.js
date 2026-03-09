import React, { useContext, useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { cart, wishlist, setSearchQuery } = useContext(AppContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigate = useNavigate();
  const searchRef = useRef(null);

  const closeMenu = () => setMenuOpen(false);

   const categorySuggestions = [
  "Solar Panels",
  "Inverters",
  "Batteries",
  "Electronics",
  "All Products",
];


  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    setSearchQuery(searchInput.trim());
    navigate(`/shop?search=${encodeURIComponent(searchInput.trim())}`);

    setSearchInput("");
    setShowSuggestions(false);
    closeMenu();
  };


const handleSuggestionClick = (suggestion) => {
  if (suggestion === "All Products") {
    setSearchQuery("");
    navigate("/shop");
  } else {
    setSearchQuery("");
    navigate(`/shop?category=${encodeURIComponent(suggestion)}`);
  }

  setSearchInput("");
  setShowSuggestions(false);
  closeMenu();
};

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinkClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <>
      {/* Running Marquee Strip - Fixed at very top */}
      <div className="marquee-strip">
  <div className="marquee-content">

    <span>
      <i className="bi bi-truck"></i> Free Delivery on Orders Above PKR 50,000
    </span>

    <span className="marquee-sep">•</span>

    <span>
      <i className="bi bi-clock"></i> Fast 2–5 Days Shipping
    </span>

    <span className="marquee-sep">•</span>

    <span>
      <i className="bi bi-whatsapp"></i> Expert Solar Consultation via WhatsApp
    </span>

    <span className="marquee-sep">•</span>

    <span>
      <i className="bi bi-shield-check"></i> Quality Products with Warranty
    </span>

    <span className="marquee-sep">•</span>

    <span>
      <i className="bi bi-headset"></i> 24/7 Customer Support
    </span>

    <span className="marquee-sep">•</span>

    <span>
      ⚡ Shop Now & Save Big!
    </span>

    {/* Duplicate for seamless infinite loop */}

    <span>
      <i className="bi bi-truck"></i> Free Delivery on Orders Above PKR 50,000
    </span>

    <span className="marquee-sep">•</span>

    <span>
      <i className="bi bi-clock"></i> Fast 2–5 Days Shipping
    </span>

    <span className="marquee-sep">•</span>

    <span>
      <i className="bi bi-whatsapp"></i> Expert Solar Consultation via WhatsApp
    </span>

    <span className="marquee-sep">•</span>

    <span>
      <i className="bi bi-shield-check"></i> Quality Products with Warranty
    </span>

    <span className="marquee-sep">•</span>

    <span>
      <i className="bi bi-headset"></i> 24/7 Customer Support
    </span>

    <span className="marquee-sep">•</span>

    <span>
      ⚡ Shop Now & Save Big!
    </span>

  </div>
</div>

      {/* Main Navbar */}
      <nav className="navbar">
        {/* LEFT - Logo + Mobile Toggle */}
        <div className="nav-left">
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <i className="bi bi-list"></i>
          </button>

          <NavLink to="/" end onClick={closeMenu} className="navbar-logo">
            <img src={logo} alt="Hyder Traders Logo" />
          </NavLink>
        </div>

        {/* CENTER LINKS */}
        <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
          <NavLink to="/" end onClick={closeMenu} className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/shop" onClick={closeMenu} className={navLinkClass}>
            Shop
          </NavLink>

          <NavLink to="/quotation" onClick={closeMenu} className={navLinkClass}>
            Quotation
          </NavLink>

          <NavLink to="/calculator" onClick={closeMenu} className={navLinkClass}>
            Calculator
          </NavLink>

          <NavLink to="/about" onClick={closeMenu} className={navLinkClass}>
            About
          </NavLink>

          <NavLink to="/contact" onClick={closeMenu} className={navLinkClass}>
            Contact
          </NavLink>
        </div>

        {/* SEARCH */}
        <div className="navbar-search-wrapper" ref={searchRef}>
          <form className="navbar-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
            />
            <button type="submit">
              <i className="bi bi-search"></i>
            </button>
          </form>

          {showSuggestions && (
            <div className="search-suggestions">
              <p className="suggestions-title">
                <i className="bi bi-stars"></i> Popular Categories
              </p>

              {categorySuggestions.map((cat) => (
                <button
                  key={cat}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(cat)}
                >
                  <i className="bi bi-arrow-right-circle"></i> {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT ICONS */}
        <div className="navbar-icons">
          <NavLink to="/wishlist" onClick={closeMenu} className="icon">
            <i className="bi bi-heart"></i>
            <span>{wishlist.length}</span>
          </NavLink>

          <NavLink to="/cart" onClick={closeMenu} className="icon">
            <i className="bi bi-cart3"></i>
            <span>{cart.length}</span>
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Navbar;