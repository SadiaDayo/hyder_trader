import React from "react";
import "../styles/Policy.css";

const PrivacyPolicy = () => {
  return (
    <div className="policy-page">
      <h1>Privacy Policy</h1>
      <p className="policy-updated">Last updated: {new Date().toLocaleDateString()}</p>

      <section>
        <h2>1. Information We Collect</h2>
        <p>
          We may collect your name, phone number, email address, delivery address,
          and order details when you place an order or request a quotation.
        </p>
      </section>

      <section>
        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>To process orders and deliver products</li>
          <li>To respond to your inquiries and provide support</li>
          <li>To improve our website experience</li>
        </ul>
      </section>

      <section>
        <h2>3. Data Protection</h2>
        <p>
          We take reasonable steps to protect your information. We do not sell
          your personal data to third parties.
        </p>
      </section>

      <section>
        <h2>4. Contact</h2>
        <p>
          If you have questions about this policy, contact us at:
          <b> info@hydertraders.com</b>
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;