// import React from "react";
// import "../../styles/Common/Footer.css"
// import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";

// function Footer() {
//   return (
//     <div>
//       <footer className="footer">
//       <div className="footer-container">

//         {/* Left: Logo */}
//         {/* <div className="footer-logo">
//           <img src="/logo.png" alt="Mark8 Logo" className="logo" />
//           <p className="subtitle">Logistics & Distribution</p>
//         </div> */}

//         {/* Middle: Form */}
//         <div className="footer-form">
//           <label htmlFor="name">NAME</label>
//           <input type="text" id="name" placeholder="Enter your name" />

//           <label htmlFor="email">EMAIL</label>
//           <input type="email" id="email" placeholder="Enter your email" />

//           <button type="submit">SUBMIT</button>
//         </div>

//         {/* Right: Links + Contact */}
//         <div className="footer-links">
//           <ul>
//             <li><a href="#careers">Careers</a></li>
//             <li><a href="#employees">Employees</a></li>
//             <li><a href="#login">Login</a></li>
//             <li><a href="#shipments">Track Shipments</a></li>
//           </ul>
//         </div>

//         <div className="footer-contact">
//           <h4>CONTACT ATECH</h4>
//           <p><strong>Phone</strong> 707-526-1910</p>
//           <p><strong>Email</strong> info@mark8logistics.com</p>

//           <h4>CORPORATE OFFICE</h4>
//           <p>7 College Avenue<br />Delhi, India 495452</p>

//           <div className="social-icons">
//             <a href="#"><FaFacebookF /></a>
//             <a href="#"><FaLinkedinIn /></a>
//           </div>
//         </div>
//       </div>

//       <div className="footer-bottom">
//         <p>Copyright © 2025 Mark8 Logistics</p>
//       </div>
//     </footer>
//     </div>
    
//   );
// }

// export default Footer;

import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

function Footer() {
  return (
    <footer className="bg-light text-dark pt-5">
      <div className="container">
        <div className="row">

          {/* Form */}
          <div className="col-md-4 mb-4">
            <h5 className="mb-3">Contact Us</h5>
            <form className="bg-white p-3 rounded shadow-sm">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control rounded-pill" id="name" placeholder="Enter your name" />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control rounded-pill" id="email" placeholder="Enter your email" />
              </div>
              <button type="submit" className="btn btn-primary w-100 rounded-pill">Submit</button>
            </form>
          </div>

          {/* Links */}
          <div className="col-md-4 mb-4">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/careers" className="text-dark text-decoration-none hover-opacity">Careers</Link></li>
              <li className="mb-2"><Link to="/employees" className="text-dark text-decoration-none hover-opacity">Employees</Link></li>
              <li className="mb-2"><Link to="/login" className="text-dark text-decoration-none hover-opacity">Login</Link></li>
              {/* <li className="mb-2"><Link to="/track-shipments" className="text-dark text-decoration-none hover-opacity">Track Shipments</Link></li> */}
            </ul>
          </div>

          {/* Contact + Social */}
          <div className="col-md-4 mb-4">
            <h5 className="mb-3">Contact Mark8 Logistics</h5>
            <p><strong>Phone:</strong> 707-526-1910</p>
            <p><strong>Email:</strong> info@mark8logistics.com</p>
            <h6>Corporate Office</h6>
            <p>7 College Avenue<br />Delhi, India 495452</p>

            <div className="d-flex gap-3 mt-3">
              <Link to="/facebook" className="fs-4 text-primary social-hover"><FaFacebook /></Link>
              <Link to="/instagram" className="fs-4 text-danger social-hover"><FaInstagram /></Link>
              <Link to="/twitter" className="fs-4 text-info social-hover"><FaTwitter /></Link>
              <Link to="/whatsapp" className="fs-4 text-success social-hover"><IoLogoWhatsapp /></Link>
            </div>
          </div>

        </div>

        <div className="text-center py-3 border-top border-secondary">
          <p className="mb-0">&copy; 2025 Mark8 Logistics</p>
        </div>
      </div>

      {/* Extra CSS in JSX for hover effect */}
      <style>
        {`
          .hover-opacity:hover {
            opacity: 0.8;
          }
          .social-hover:hover {
            transform: scale(1.3);
            transition: 0.3s;
          }
        `}
      </style>
    </footer>
  );
}

export default Footer;