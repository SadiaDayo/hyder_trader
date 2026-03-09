import React from "react";
import "../styles/Policy.css";

const Terms = () => {
  return (
    <div className="policy-page">
      <h1>Terms & Conditions</h1>
      <p className="policy-updated">Last updated: {new Date().toLocaleDateString()}</p>

      <section>
        <h2>1. Website Use</h2>
        <p>
          By using this website, you agree to follow our terms and applicable laws.
        </p>
      </section>

      <section>
        <h2>2. Pricing & Availability</h2>
        <p>
          Prices and stock availability may change without notice. We try our best
          to keep information accurate.
        </p>
      </section>

      <section>
        <h2>3. Orders</h2>
        <p>
          Your order is confirmed once we verify details and confirm availability.
        </p>
      </section>

      <section>
        <h2>4. Liability</h2>
        <p>
          Hyder Traders is not responsible for indirect losses. Our maximum liability
          is limited to the product price.
        </p>
      </section>
    </div>
  );
};

export default Terms;