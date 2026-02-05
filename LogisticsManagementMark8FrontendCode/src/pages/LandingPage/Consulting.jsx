// src/pages/Consulting.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import SupplyChainImg from "../../assets/ConsultingSupplychain.jpg";
import ConsultingProcessOptimization from "../../assets/ConsultingProcessOptimization.jpg";
import ConsultingRiskManagement from "../../assets/ConsultingRiskManagement.jpg";
import Footer from "./Footer";

function Consulting() {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Consulting Services</h2>
      <p className="text-center mb-5">
        Our consulting team helps you optimize your business processes and
        logistics strategy for maximum efficiency.
      </p>
      <div className="row g-4">
        {/* Supply Chain Consulting */}
        <div className="col-md-4">
          <div
            className="card h-100 shadow-sm cursor-pointer"
            onClick={() => navigate("/consulting/supply-chain")}
          >
            <img
              src={SupplyChainImg}
              className="card-img-top"
              alt="Supply Chain Consulting"
              style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body text-center">
              <h5 className="card-title">Supply Chain Consulting</h5>
              <p className="card-text">Improve efficiency and reduce costs.</p>
            </div>
          </div>
        </div>

        {/* Process Optimization */}
        <div className="col-md-4">
          <div
            className="card h-100 shadow-sm cursor-pointer"
            onClick={() => navigate("/consulting/process-optimization")}
          >
            <img
              src={ConsultingProcessOptimization}
              className="card-img-top"
              alt="Process Optimization"
              style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body text-center">
              <h5 className="card-title">Process Optimization</h5>
              <p className="card-text">
                Streamline operations for better productivity.
              </p>
            </div>
          </div>
        </div>

        {/* Risk Management */}
        <div className="col-md-4">
          <div
            className="card h-100 shadow-sm cursor-pointer"
            onClick={() => navigate("/consulting/risk-management")}
          >
            <img
              src={ConsultingRiskManagement}
              className="card-img-top"
              alt="Risk Management"
              style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body text-center">
              <h5 className="card-title">Risk Management</h5>
              <p className="card-text">
                Minimize operational and logistical risks.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Consulting;
