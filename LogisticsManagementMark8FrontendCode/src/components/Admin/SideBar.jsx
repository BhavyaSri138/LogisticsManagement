// src/Components/Admin/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="col-md-3 bg-dark text-white min-vh-100 p-3">
      <h4>Admin Panel</h4>
      <ul className="nav flex-column">
        <li className="nav-item"><Link className="nav-link text-white" to="/admin/users">User Management</Link></li>
        <li className="nav-item"><Link className="nav-link text-white" to="/admin/shipments">Shipment Overview</Link></li>
        <li className="nav-item"><Link className="nav-link text-white" to="/admin/warehouse">Warehouse Overview</Link></li>
        <li className="nav-item"><Link className="nav-link text-white" to="/admin/assign-tasks">Assign Tasks</Link></li>
        <li className="nav-item"><Link className="nav-link text-white" to="/admin/reports">Reports</Link></li>
        {/* <li className="nav-item"><Link className="nav-link text-white" to="/admin/settings">Settings</Link></li> */}
        <li className="nav-item"><Link className="nav-link text-white" to="/">Logout</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
