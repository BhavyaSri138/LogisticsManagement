import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import SupportBanner from "../../assets/Support.jpg"; // banner image

function Support() {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Support Services</h2>
      <p className="text-center mb-4">
        We provide 24/7 customer support and technical assistance to ensure
        smooth logistics operations.
      </p>

      {/* Banner Image */}
      <div className="text-center mb-5">
        <img
          src={SupportBanner}
          alt="Support Services"
          className="img-fluid rounded shadow"
          style={{ maxHeight: "350px", objectFit: "cover" }}
        />
      </div>

      {/* Cards */}
      <div className="row g-4">
        <div className="col-md-4">
          <div
            className="card h-100 shadow-sm text-center hover-shadow"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/support/customer")}
          >
            <div className="card-body">
              <h5 className="card-title">Customer Support</h5>
              <p className="card-text">
                Help with shipments, orders, and inquiries.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className="card h-100 shadow-sm text-center hover-shadow"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/support/technical")}
          >
            <div className="card-body">
              <h5 className="card-title">Technical Assistance</h5>
              <p className="card-text">
                Support for software and logistics tools.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className="card h-100 shadow-sm text-center hover-shadow"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/support/training")}
          >
            <div className="card-body">
              <h5 className="card-title">Training & Tutorials</h5>
              <p className="card-text">
                Guides and training for your team members.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Support;
