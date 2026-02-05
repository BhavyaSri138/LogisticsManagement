import React from "react";
import { Link } from "react-router-dom";
import ConsultingRiskManagement from "../../assets/ConsultingRiskManagement.jpg";
import Footer from "./Footer";

function RiskManagement() {
  return (
    <div>
      {/* Hero Section */}
      <div
        className="text-white text-center d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url(${ConsultingRiskManagement})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px",
        }}
      >
        <h1 className="fw-bold bg-dark bg-opacity-50 p-3 rounded">
          Risk Management
        </h1>
      </div>

      {/* Content */}
      <div className="container py-5">
        <h2 className="mb-3">Minimize Risks, Maximize Confidence</h2>
        <p>
          Risk is an inevitable part of any business. Our risk management
          consulting services help you identify potential threats, evaluate their
          impact, and build mitigation strategies that protect your operations and
          reputation.
        </p>

        <h4 className="mt-4">Our Approach Covers:</h4>
        <ul>
          <li>Operational and financial risk analysis</li>
          <li>Regulatory compliance and governance</li>
          <li>Business continuity and disaster recovery planning</li>
          <li>Cybersecurity and data protection strategies</li>
        </ul>

        <div className="mt-4">
          <Link to="/consulting" className="btn btn-primary me-3">
            ← Back to Consulting Services
          </Link>
          <button className="btn btn-success">Contact Us</button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default RiskManagement;
