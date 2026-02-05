import React from "react";
import Footer from "./Footer";
function CustomerSupport() {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Customer Support</h2>
      <p className="text-muted text-center mb-5">
        Our team is available 24/7 to help you with shipment tracking, order
        issues, and general inquiries.
      </p>

      <div className="card shadow-sm p-4">
        <h5>Contact Options</h5>
        <ul>
          <li>Email: support@logistics.com</li>
          <li>Phone: +91 98765 43210</li>
          <li>Live Chat: Available on the dashboard</li>
        </ul>
      </div>
        <Footer />
    </div>
  );
}

export default CustomerSupport;
