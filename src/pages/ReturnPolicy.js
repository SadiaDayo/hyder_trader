import React from "react";
import "../styles/Policy.css";

const ReturnPolicy = () => {
  return (
    <div className="policy-page">
      <h1>Return Policy</h1>
      <p className="policy-updated">Last updated: {new Date().toLocaleDateString()}</p>

      <section>
        <h2>1. Eligibility</h2>
        <p>
          Returns are accepted within <b>7 days</b> of delivery if the product is
          unused, in original packing, and in resellable condition.
        </p>
      </section>

      <section>
        <h2>2. Non-Returnable Items</h2>
        <ul>
          <li>Used or installed products</li>
          <li>Items without original packaging</li>
          <li>Customized / special order items</li>
        </ul>
      </section>

      <section>
        <h2>3. Process</h2>
        <p>
          To request a return, contact our support via WhatsApp or email with your
          order details and reason for return.
        </p>
      </section>

      <section>
        <h2>4. Refunds</h2>
        <p>
          Refunds are processed after inspection. Delivery charges are non-refundable.
        </p>
      </section>
    </div>
  );
};

export default ReturnPolicy;