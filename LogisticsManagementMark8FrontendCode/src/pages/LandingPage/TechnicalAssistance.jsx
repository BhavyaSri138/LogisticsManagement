import React from "react";
import Footer from "./Footer";
function TechnicalAssistance() {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Technical Assistance</h2>
      <p className="text-muted text-center mb-5">
        Need help with our logistics software or tools? Our technical team is
        here to guide you.
      </p>

      <div className="card shadow-sm p-4">
        <h5>Available Services</h5>
        <ul>
          <li>System troubleshooting</li>
          <li>Software installation support</li>
          <li>API integration help</li>
        </ul>
      </div>
        <Footer />
    </div>
  );
}

export default TechnicalAssistance;
