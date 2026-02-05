// Section one.jsx                                                                                                                                                                                                                                         import React from "react";
// import "../../styles/Common/SectionOne.css"
// import LogisticsLogo from "../../assets/logistics logo.jpg";
// const SectionOne = () => {
//   return (
//     <div className="section-one">
//       <img src={LogisticsLogo} alt="Background" className="background-image" />
//       {/* Background Video */}
//       {/* <video autoPlay loop muted playsInline className="background-video">
//         <source src={Logisticsvideo} type="video/mp4" />
//         //Your browser does not support the video tag.
//       //</video>
//  */}
//       {/* Overlay Content */}
//       <div className="text-left text-white p-20">
//         <h1>
//           PROVIDING DEDICATED <br />
//           TRANSPORTATION SERVICES <br />
//           ACROSS INDIA
//         </h1>
//         <button className="contact-btn">CONTACT US</button>
//       </div>
//     </div>
//   );
// };

// export default SectionOne;
import React from "react";
import "../../styles/Common/SectionOne.css";
import LogisticsLogo from "../../assets/logistics logo.jpg";

const SectionOne = () => {
  return (
    <div className="section-one">
      {/* Left Text Content */}
      <div className="text-left">
        <h1>
          PROVIDING DEDICATED <br />
          TRANSPORTATION SERVICES <br />
          ACROSS INDIA
        </h1>
        <button className="contact-btn">CONTACT US</button>
      </div>

      {/* Right Image */}
      <div className="image-container">
        <img src={LogisticsLogo} alt="Logistics Warehouse" className="background-image" />
      </div>
    </div>
  );
};

export default SectionOne;