import React from "react";
import { Link } from "react-router-dom";
import SupplyChainImg from "../../assets/ConsultingSupplychain.jpg";
import Footer from "./Footer";

function SupplyChainConsulting() {
  return (
    <div>
      {/* Hero Section */}
      <div
        className="text-white text-center d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url(${SupplyChainImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px",
        }}
      >
        <h1 className="fw-bold bg-dark bg-opacity-50 p-3 rounded">
          Supply Chain Consulting
        </h1>
      </div>

      {/* Content */}
      <div className="container py-5">
        <h2 className="mb-3">Transform Your Supply Chain</h2>
        <p>
          Our supply chain consulting services help organizations streamline
          logistics, enhance supplier collaboration, and reduce costs. We analyze
          procurement, warehousing, transportation, and distribution processes to
          ensure maximum efficiency and resilience.
        </p>

        <h4 className="mt-4">Our Expertise Includes:</h4>
        <ul>
          <li>Inventory and warehouse management optimization</li>
          <li>Supplier and vendor relationship strategies</li>
          <li>Digital tools for real-time supply chain visibility</li>
          <li>Lean and agile supply chain models</li>
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

export default SupplyChainConsulting;
