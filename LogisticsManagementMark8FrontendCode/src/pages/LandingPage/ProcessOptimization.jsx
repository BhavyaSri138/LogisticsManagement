import React from "react";
import { Link } from "react-router-dom";
import ConsultingProcessOptimization from "../../assets/ConsultingProcessOptimization.jpg";
import Footer from "./Footer";

function ProcessOptimization() {
  return (
    <div>
      {/* Hero Section */}
      <div
        className="text-white text-center d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url(${ConsultingProcessOptimization})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px",
        }}
      >
        <h1 className="fw-bold bg-dark bg-opacity-50 p-3 rounded">
          Process Optimization
        </h1>
      </div>

      {/* Content */}
      <div className="container py-5">
        <h2 className="mb-3">Streamline Operations, Maximize Productivity</h2>
        <p>
          Our process optimization services are designed to identify
          inefficiencies in your workflows and transform them into streamlined,
          cost-effective operations. We use industry best practices and data-driven
          analysis to deliver measurable improvements.
        </p>

        <h4 className="mt-4">What We Deliver:</h4>
        <ul>
          <li>End-to-end workflow analysis</li>
          <li>Automation and digital process design</li>
          <li>Reducing redundancies and bottlenecks</li>
          <li>Performance monitoring and reporting</li>
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

export default ProcessOptimization;
