import React from "react";
import { FaUsers, FaHardHat, FaUsb, FaRecycle } from "react-icons/fa";
import "../../styles/Common/SectionTwo.css";

function SectionTwo() {
  return (
    <section className="section-two">
      {/* Title */}
      <h2 className="section-two-title">What Makes Us Different</h2>

      {/* Cards */}
      <div className="section-two-container">
        <div className="section-two-card">
          <FaUsers className="section-two-icon" />
          <h3>People</h3>
          <p>We invest in skilled professionals who deliver excellence.</p>
        </div>

        <div className="section-two-card">
          <FaHardHat className="section-two-icon" />
          <h3>Safety</h3>
          <p>We prioritize safety standards across all operations.</p>
        </div>

        <div className="section-two-card">
          <FaUsb className="section-two-icon" />
          <h3>Technology</h3>
          <p>We leverage modern tools for efficiency and transparency.</p>
        </div>

        <div className="section-two-card">
          <FaRecycle className="section-two-icon" />
          <h3>Sustainability</h3>
          <p>We ensure eco-friendly practices in logistics solutions.</p>
        </div>
      </div>
    </section>
  );
}

export default SectionTwo;