import React from "react";
import "../styles/Policy.css";

const Warranty = () => {
  return (
    <div className="policy-page">
      <h1>Warranty Policy</h1>
      <p className="policy-updated">Last updated: {new Date().toLocaleDateString()}</p>

      <section>
        <h2>1. Warranty Coverage</h2>
        <p>
          Warranty depends on the brand and product type. Warranty claims are processed
          according to manufacturer terms.
        </p>
      </section>

      <section>
        <h2>2. What is Covered</h2>
        <ul>
          <li>Manufacturing defects (as per brand policy)</li>
          <li>Faults confirmed by authorized inspection</li>
        </ul>
      </section>

      <section>
        <h2>3. What is Not Covered</h2>
        <ul>
          <li>Physical damage, water damage, burning</li>
          <li>Improper installation or misuse</li>
          <li>Repairs by unauthorized technicians</li>
        </ul>
      </section>

      <section>
        <h2>4. Warranty Claim</h2>
        <p>
          Contact us with invoice details, product model, and issue description.
          We will guide you through the claim process.
        </p>
      </section>
    </div>
  );
};

export default Warranty;