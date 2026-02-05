import React from "react";
import { Outlet, Link } from "react-router-dom";
import "../../styles/admin/DeliveryDashboard.css";


function DeliveryLayout() {
  return (
    <div className="delivery-layout d-flex">
      {/* Sidebar */}
      <div className="sidebar bg-dark text-white p-3">
        <h4 className="text-center mb-4">📦 Delivery Menu</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link to="/delivery" className="nav-link text-white">🏠 Dashboard</Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/delivery/assigned" className="nav-link text-white">🚚 Assigned Shipments</Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/delivery/update" className="nav-link text-white">✏️ Update Shipment</Link>
          </li>
          
          <li className="nav-item mt-4">
            <button className="btn btn-danger w-100"><Link to="/">🚪 Logout</Link></button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="content flex-grow-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default DeliveryLayout;
