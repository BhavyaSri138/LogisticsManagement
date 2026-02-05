// import React from "react";
// import Footer from "./Footer";

// // ✅ Import images
// import LogisticsWarehouse from "../../assets/LogisticsWarehouse.jpg";
// import LogisticsTransportation from "../../assets/LogisticsTransportation.jpg";
// import LogisticsTracking from "../../assets/LogisticsTracking.jpg";

// function Logistics() {
//   return (
//     <div className="container py-5">
//       <h2 className="text-center mb-4">Logistics Services</h2>
//       <p className="text-center mb-5">
//         We provide end-to-end logistics solutions for businesses, including
//         supply chain management, shipment tracking, and distribution.
//       </p>

//       <div className="row g-4">
//         {/* Warehousing */}
//         <div className="col-md-4">
//           <div className="card h-100 shadow-sm">
//             <img
//               src={LogisticsWarehouse}
//               alt="Warehousing"
//               className="card-img-top"
//               style={{ height: "200px", objectFit: "cover" }}
//             />
//             <div className="card-body text-center">
//               <h5 className="card-title">Warehousing</h5>
//               <p className="card-text">
//                 Secure storage facilities for your goods.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Transportation */}
//         <div className="col-md-4">
//           <div className="card h-100 shadow-sm">
//             <img
//               src={LogisticsTransportation}
//               alt="Transportation"
//               className="card-img-top"
//               style={{ height: "200px", objectFit: "cover" }}
//             />
//             <div className="card-body text-center">
//               <h5 className="card-title">Transportation</h5>
//               <p className="card-text">
//                 Reliable transportation across regions.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Tracking */}
//         <div className="col-md-4">
//           <div className="card h-100 shadow-sm">
//             <img
//               src={LogisticsTracking}
//               alt="Tracking"
//               className="card-img-top"
//               style={{ height: "200px", objectFit: "cover" }}
//             />
//             <div className="card-body text-center">
//               <h5 className="card-title">Tracking</h5>
//               <p className="card-text">
//                 Real-time shipment tracking and updates.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default Logistics;



import React from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";

// ✅ Import images
import LogisticsWarehouse from "../../assets/LogisticsWarehouse.jpg";
import LogisticsTransportation from "../../assets/LogisticsTransportation.jpg";
import LogisticsTracking from "../../assets/LogisticsTracking.jpg";

function Logistics() {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Logistics Services</h2>
      <p className="text-center mb-5">
        We provide end-to-end logistics solutions for businesses, including
        supply chain management, shipment tracking, and distribution.
      </p>

      <div className="row g-4">
        {/* Warehousing */}
        <div className="col-md-4">
          <Link to="/warehousing" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="card h-100 shadow-sm">
              <img
                src={LogisticsWarehouse}
                alt="Warehousing"
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">Warehousing</h5>
                <p className="card-text">Secure storage facilities for your goods.</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Transportation */}
        <div className="col-md-4">
          <Link to="/transportation" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="card h-100 shadow-sm">
              <img
                src={LogisticsTransportation}
                alt="Transportation"
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">Transportation</h5>
                <p className="card-text">Reliable transportation across regions.</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Tracking */}
        <div className="col-md-4">
          <Link to="/tracking" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="card h-100 shadow-sm">
              <img
                src={LogisticsTracking}
                alt="Tracking"
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">Tracking</h5>
                <p className="card-text">Real-time shipment tracking and updates.</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Logistics;