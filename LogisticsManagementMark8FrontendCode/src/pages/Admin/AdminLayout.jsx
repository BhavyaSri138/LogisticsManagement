import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Admin/SideBar.jsx"; // your sidebar file
import "bootstrap/dist/css/bootstrap.min.css";

const AdminLayout = () => {
  return (
    <div className="d-flex">
      {/* Sidebar constant */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-grow-1 p-3" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
