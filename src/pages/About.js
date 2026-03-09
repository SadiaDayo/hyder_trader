import React from "react";
import "../styles/About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-card">
        <div className="about-header">
          <h1>About Hyder Traders</h1>
          <p className="tagline">
            Reliable Solar & Electronics Solutions Since 2015
          </p>
        </div>

        <div className="about-content">
          <section className="mission-section">
            <h2>Our Mission</h2>
            <p>
              At Hyder Traders, we are committed to delivering high-quality, sustainable energy solutions and advanced electronics that empower homes, businesses, and communities across Pakistan.
            </p>
            <p>
              With over <strong>10 years</strong> of experience, we specialize in solar panels, inverters, batteries, LED lighting, and energy-efficient appliances — all backed by excellent after-sales support and customer-first service.
            </p>
          </section>

          <section className="values-section">
            <h2>Our Core Values</h2>
            <div className="values-grid">
              <div className="value-item">
                <span className="value-icon">🔋</span>
                <h3>Quality First</h3>
                <p>We only offer products that meet international standards for performance and durability.</p>
              </div>

              <div className="value-item">
                <span className="value-icon">🌱</span>
                <h3>Sustainability</h3>
                <p>Promoting clean energy and eco-friendly solutions for a greener Pakistan.</p>
              </div>

              <div className="value-item">
                <span className="value-icon">🤝</span>
                <h3>Customer Trust</h3>
                <p>Transparent pricing, honest advice, and reliable support — always.</p>
              </div>

              <div className="value-item">
                <span className="value-icon">⚡</span>
                <h3>Innovation</h3>
                <p>Bringing the latest solar and electronic technologies to our customers.</p>
              </div>
            </div>
          </section>

          <section className="why-us">
            <h2>Why Choose Hyder Traders?</h2>
            <ul className="why-list">
              <li>Wide range of trusted brands and genuine products</li>
              <li>Expert advice and custom system design</li>
              <li>Competitive prices with no hidden costs</li>
              <li>Fast delivery across Karachi and Sindh</li>
              <li>After-sales service and warranty support</li>
            </ul>
          </section>

          <div className="contact-cta">
            <p>Ready to power your future with clean energy?</p>
            <a href="/contact" className="cta-button">
              Get in Touch Today
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;