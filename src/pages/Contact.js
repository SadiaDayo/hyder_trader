import React, { useState } from "react";
import "../styles/Contact.css";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [mapQuery, setMapQuery] = useState("Karachi, Sindh, Pakistan");
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMapSearch = (e) => {
    const value = e.target.value.trim();
    if (value) {
      setMapQuery(`${value}, Karachi, Sindh, Pakistan`);
    } else {
      setMapQuery("Karachi, Sindh, Pakistan");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === "preparing") return;
    setStatus("preparing");

    try {
      const subject = encodeURIComponent(`Contact Message from ${form.name || "Visitor"}`);
      const body = encodeURIComponent(
        `Name: ${form.name || "N/A"}\n` +
        `Email: ${form.email || "N/A"}\n\n` +
        `Message:\n${form.message || "No message"}\n\n` +
        `Sent from Hyder Traders website`
      );

      const mailtoLink = `mailto:hydertrader@gmail.com?subject=${subject}&body=${body}`;
      window.location.href = mailtoLink;

      setTimeout(() => {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 7000);
      }, 800);
    } catch (err) {
      console.error(err);
      setStatus("failed");
      setTimeout(() => setStatus("idle"), 7000);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p className="lead-text">
            Have questions about solar panels, inverters, batteries or electronics?<br />
            We're here to help — reach out anytime!
          </p>
        </div>

        <div className="contact-grid">
          {/* Left column - Info + Map */}
          <div className="contact-info-section">
            <h2>Our Location</h2>
            <div className="info-item">
              <span className="icon">📍 </span>
              <p>Hyder Traders<br />Karachi, Sindh, Pakistan</p>
            </div>

            <div className="info-item">
              <span className="icon">📞</span>
              <p>+92 300 1234567 (Phone / WhatsApp)</p>
            </div>

            <div className="info-item">
              <span className="icon">✉️</span>
              <p>info@hydertraders.com</p>
            </div>

            <div className="map-section">
              <label htmlFor="map-search">Search City or Area</label>
              <input
                id="map-search"
                type="text"
                placeholder="e.g. Saddar, Clifton, Gulshan, Hyder Traders"
                onChange={handleMapSearch}
                className="map-search-input"
              />

              <div className="map-wrapper">
                <iframe
                  title="Hyder Traders Location"
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.0000000000005!2d67.01000000000001!3d24.860000000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e5c5f5f5f5f%3A0x5f5f5f5f5f5f5f5f!2s${encodeURIComponent(mapQuery)}!5e0!3m2!1sen!2s!4v1690000000000`}
                  width="100%"
                  height="350"
                  style={{ border: 0, borderRadius: "12px" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Right column - Form */}
          <div className="contact-form-section">
            <h2>Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  id="name"
                  name="name"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="yourname@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Your Message *</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="How can we assist you today? (product inquiry, quotation, support, etc.)"
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  required
                />
              </div>

              <button
                type="submit"
                className={`submit-btn ${status === "preparing" ? "loading" : ""}`}
                disabled={status === "preparing"}
              >
                {status === "preparing"
                  ? "Opening email client..."
                  : status === "success"
                  ? "Compose Window Opened ✓"
                  : "Send Message"}
              </button>

              {status === "success" && (
                <p className="success-msg">
                  Your email compose window should open now.<br />
                  Please review and click <strong>Send</strong>.
                </p>
              )}

              {status === "failed" && (
                <p className="error-msg">
                  Could not open email client.<br />
                  Please send manually to <strong>info@hydertraders.com</strong>
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;