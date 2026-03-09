import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { FiPhoneCall, FiMail, FiMapPin } from 'react-icons/fi';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Column 1: About & Contact Info */}
        <div className="footer-col about-col">
          <h3>Hyder Traders</h3>
          <p className="about-text">
            Providing quality solar panels, inverters, batteries, and electronics since 2000.<br />
            Your trusted partner for reliable energy and tech solutions.
          </p>

          <div className="contact-items">
            <div className="contact-item">
              <FiMapPin className="icon" />
              <span>Karachi, Sindh, Pakistan</span>
            </div>
            <div className="contact-item">
              <FiPhoneCall className="icon" />
              <span>+92 300 1234567</span>
            </div>
            <div className="contact-item">
              <FiMail className="icon" />
              <span>info@hydertraders.com</span>
            </div>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-col links-col">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/quotation">Quotation</Link></li>
            <li><Link to="/calculator">Load Calculator</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
          
        </div>

        {/* Column 3: Social Media */}
        <div className="footer-col social-col">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a 
              href="https://facebook.com/hydertraders" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link facebook"
            >
              <FaFacebookF />
            </a>
            <a 
              href="https://instagram.com/hydertraders" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link instagram"
            >
              <FaInstagram />
            </a>
            <a 
              href="https://wa.me/923001234567" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link whatsapp"
            >
              <FaWhatsapp />
            </a>
            <a 
              href="https://youtube.com/@hydertraders" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link youtube"
            >
              <FaYoutube />
            </a>
          </div>
          <h4 style={{ marginTop: "22px" }}>Policies</h4>
<ul className="footer-links">
  <li><Link to="/return-policy">Return Policy</Link></li>
  <li><Link to="/privacy-policy">Privacy Policy</Link></li>
  <li><Link to="/terms">Terms & Conditions</Link></li>
  <li><Link to="/warranty">Warranty Policy</Link></li>
</ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Hyder Traders. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;