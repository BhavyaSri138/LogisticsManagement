import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../styles/admin/AssignDriver.css";

const AssignDriver = () => {
  const [shipmentId, setShipmentId] = useState('');
  const [driverId, setDriverId] = useState('');
  const [assignments, setAssignments] = useState([]);
  const [role, setRole] = useState('WarehouseManager'); // Change to 'Viewer' to restrict

  // Mock data (later can be replaced with API)
  const shipments = [
    { id: 'SHP001', name: 'Shipment A' },
    { id: 'SHP002', name: 'Shipment B' },
    { id: 'SHP003', name: 'Shipment C' },
  ];

  const drivers = [
    { id: 'DRV001', name: 'Driver X' },
    { id: 'DRV002', name: 'Driver Y' },
    { id: 'DRV003', name: 'Driver Z' },
  ];

  const handleAssign = (e) => {
    e.preventDefault();
    if (!shipmentId || !driverId) {
      toast.warning('Please select both shipment and driver.');
      return;
    }

    const newAssign = {
      id: Date.now(),
      shipment: shipments.find(s => s.id === shipmentId).name,
      driver: drivers.find(d => d.id === driverId).name,
      time: new Date().toLocaleString(),
    };

    setAssignments([newAssign, ...assignments]);
    toast.success(`Driver ${newAssign.driver} assigned to ${newAssign.shipment}`);
    setShipmentId('');
    setDriverId('');
  };

  return (
    <div className="warehouse-container">
      <ToastContainer />
      
      {/* Sidebar */}
      <div className="sidebar">
        <h4>Warehouse Manager</h4>
        <ul>
          <li><Link to="/warehouse-dashboard">Dashboard</Link></li>
          <li><Link to="/inventory">Inventory</Link></li>
          <li><Link to="/orders">Orders</Link></li>
          <li><Link to="/assign-driver">Assign Driver</Link></li>
          
          <li><Link to="/settings">Settings</Link></li>
          <li><Link to="/logout" className="logout-link">Logout</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="container mt-4">
          <div className="card-box">
            <h2 className="section-title">Assign Driver</h2>

            {role === 'Admin' ? (
              <form onSubmit={handleAssign} className="border p-4 bg-light rounded shadow-sm">
                <div className="mb-3">
                  <label className="form-label">Select Shipment</label>
                  <select
                    className="form-select"
                    value={shipmentId}
                    onChange={(e) => setShipmentId(e.target.value)}
                  >
                    <option value="">-- Choose Shipment --</option>
                    {shipments.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Select Driver</label>
                  <select
                    className="form-select"
                    value={driverId}
                    onChange={(e) => setDriverId(e.target.value)}
                  >
                    <option value="">-- Choose Driver --</option>
                    {drivers.map(d => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button type="submit" className="btn btn-primary w-100">Assign Driver</button>
              </form>
            ) : (
              <p className="text-danger">You do not have permission to assign drivers.</p>
            )}
          </div>

          <div className="card-box mt-5">
            <h4 className="section-title">Assignment History</h4>
            {assignments.length === 0 ? (
              <p>No assignments yet.</p>
            ) : (
              <table className="table table-bordered table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>Shipment</th>
                    <th>Driver</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {assignments.map(assign => (
                    <tr key={assign.id}>
                      <td>{assign.shipment}</td>
                      <td>{assign.driver}</td>
                      <td>{assign.time}</td>
                      <td>
                        <span className="badge bg-success">Assigned</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignDriver;