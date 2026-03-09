import React, { useState } from "react";
import "../styles/Quotation.css";

const Quotation = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    requirements: "",
  });

  const [status, setStatus] = useState("idle"); // idle | preparing | success | failed

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === "preparing") return;

    setStatus("preparing");

    try {
      const subject = encodeURIComponent(`Quotation Request from ${formData.fullName || "Visitor"}`);
      const body = encodeURIComponent(
        `Full Name: ${formData.fullName || "N/A"}\n` +
        `Email: ${formData.email || "N/A"}\n` +
        `Phone: ${formData.phone || "N/A"}\n\n` +
        `Requirements / Project Details:\n${formData.requirements || "No details provided"}\n\n` +
        `Sent from Hyder Traders Website`
      );

      const mailtoLink = `mailto:hydertrader@gmail.com?subject=${subject}&body=${body}`;
      window.location.href = mailtoLink;

      // After opening mail client
      setTimeout(() => {
        setStatus("success");
        setFormData({ fullName: "", email: "", phone: "", requirements: "" });
        setTimeout(() => setStatus("idle"), 10000);
      }, 800);
    } catch (err) {
      console.error(err);
      setStatus("failed");
      setTimeout(() => setStatus("idle"), 7000);
    }
  };

  return (
    <div className="quotation-page">
      <div className="quotation-container">
        <h1>Get the Best Offer</h1>
        <p className="subtitle">
          Tell us your requirements and we'll get back to you with the best quote.
        </p>

        <form onSubmit={handleSubmit} className="quotation-form">
          <div className="form-group">
            <label htmlFor="fullName">Full Name *</label>
            <input
              id="fullName"
              name="fullName"
              placeholder="Your full name"
              value={formData.fullName}
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
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone / WhatsApp Number *</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              placeholder="+92 321 1234567"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="requirements">Your Requirements / Project Details *</label>
            <textarea
              id="requirements"
              name="requirements"
              placeholder="Example:\n• 10 × 550W solar panels\n• 5kW hybrid inverter\n• 10kWh lithium battery\nLocation: Karachi"
              value={formData.requirements}
              onChange={handleChange}
              rows={5}
              required
            />
          </div>

          <button
            type="submit"
            className={`btn-submit ${status === "preparing" ? "loading" : ""}`}
            disabled={status === "preparing"}
          >
            {status === "preparing"
              ? "Opening email client..."
              : status === "success"
              ? "Compose Window Opened ✓"
              : "Send Request"}
          </button>

          {status === "success" && (
            <div className="success-message">
              Your email compose window should open now.<br />
              Please review and click <strong>Send</strong>.
            </div>
          )}

          {status === "failed" && (
            <div className="error-message">
              Could not open email client.<br />
              Please send manually to <strong>hydertrader@gmail.com</strong>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Quotation;
