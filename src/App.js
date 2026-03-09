import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat"; 

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Wishlist from "./pages/WishList";
import Checkout from "./pages/Checkout";
import Quotation from "./pages/Quotation";
import Calculator from "./pages/Calculator";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ReturnPolicy from "./pages/ReturnPolicy";
import Terms from "./pages/Terms";
import Warranty from "./pages/Warranty";
import ScrollToTop from "./components/ScrollTop";
function App() {
  return (
    <Router>
      <ScrollToTop/> {/* Scroll to top on route change */}
      <div className="app">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/quotation" element={<Quotation />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
<Route path="/return-policy" element={<ReturnPolicy />} />
<Route path="/terms" element={<Terms />} />
<Route path="/warranty" element={<Warranty />} />
        </Routes>

        <Footer />
        <WhatsAppFloat /> {/* ✅ add here */}
      </div>
    </Router>
  );
}

export default App;