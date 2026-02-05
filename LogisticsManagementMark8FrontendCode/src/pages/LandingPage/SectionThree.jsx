import React from "react";
import "../../styles/Common/SectionThree.css";
import LogisticsImage from "../../assets/Logisticsimage.jpg"

const SectionThree = () => {
  return (
    <div
      className="section-three"
      style={{ backgroundImage: `url(${LogisticsImage})` }}
    >
      <div className="overlay-content">
        <h2 className="section-title">Industries We Serve</h2>

        <div className="industries-box">
          <div className="industry-grid">

            <div className="industry-card">
              <h4>Automotive</h4>
              <p>By cutting out deadhead loads and optimizing assets, we help manage the entire supply chain operations for the automotive industry.</p>
            </div>

            <div className="industry-card">
              <h4>Retail</h4>
              <p>With our guarantee to deliver retail goods on-time, safely, and securely, our customers know they can rely on us to meet their shipping needs.</p>
            </div>

            <div className="industry-card">
              <h4>Building Materials</h4>
              <p>We provide dedicated fleet services for building supply customers to ensure their products arrive intact and on time.</p>
            </div>

            <div className="industry-card">
              <h4>Food & Beverage</h4>
              <p>We professionally handle the movement of perishable, non-perishable, and frozen food and beverage products.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionThree;