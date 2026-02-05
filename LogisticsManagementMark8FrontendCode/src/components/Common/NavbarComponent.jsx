import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Common/Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">Mark8 Logistics</div>

      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <Link to="/" className="nav-link">Home</Link>

        <div className="dropdown">
          <button className="dropbtn">About Us▾</button>
          <div className="dropdown-content">
            <Link to="/aboutus">Company</Link>
            <Link to="/team">Team</Link>
             <Link to="/careers">Careers</Link>
          </div>
        </div>

        <div className="dropdown">
          <button className="dropbtn">Services ▾</button>
          <div className="dropdown-content">
            <Link to="/logistics">Logistics</Link>
             <Link to="/consulting">Consulting</Link>
             <Link to="/support">Support</Link>
          </div>
        </div>

        <Link to="/login" className="nav-link login-link">Login</Link>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>
    </nav>
  );
}

export default Navbar;