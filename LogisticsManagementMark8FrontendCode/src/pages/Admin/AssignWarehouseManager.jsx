import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AssignWarehouseManager = () => {
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [selectedManager, setSelectedManager] = useState("");
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      warehouse: "Warehouse A",
      manager: "Manager 1",
      time: "2025-08-21 10:30 AM",
      status: "Assigned",
    },
    {
      id: 2,
      warehouse: "Warehouse B",
      manager: "Manager 2",
      time: "2025-08-20 4:15 PM",
      status: "Assigned",
    },
  ]); // Dummy data

  const handleAssign = () => {
    if (selectedWarehouse && selectedManager) {
      const newAssignment = {
        id: Date.now(),
        warehouse: selectedWarehouse,
        manager: selectedManager,
        time: new Date().toLocaleString(),
        status: "Assigned",
      };
      setAssignments([...assignments, newAssignment]);
      toast.success(`Manager ${selectedManager} assigned to ${selectedWarehouse}`);
      setSelectedWarehouse("");
      setSelectedManager("");
    } else {
      toast.error("⚠️ Please select both warehouse and manager!");
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="card p-4 shadow">
        <h2 className="text-center text-primary mb-4">📦 Assign Warehouse Manager</h2>

        {/* Select Warehouse */}
        <div className="mb-3">
          <label className="form-label fw-bold">Select Warehouse</label>
          <select
            className="form-select"
            value={selectedWarehouse}
            onChange={(e) => setSelectedWarehouse(e.target.value)}
          >
            <option value="">-- Choose Warehouse --</option>
            <option value="Warehouse A">Warehouse A</option>
            <option value="Warehouse B">Warehouse B</option>
            <option value="Warehouse C">Warehouse C</option>
          </select>
        </div>

        {/* Select Manager */}
        <div className="mb-3">
          <label className="form-label fw-bold">Select Manager</label>
          <select
            className="form-select"
            value={selectedManager}
            onChange={(e) => setSelectedManager(e.target.value)}
          >
            <option value="">-- Choose Manager --</option>
            <option value="Manager 1">Manager 1</option>
            <option value="Manager 2">Manager 2</option>
            <option value="Manager 3">Manager 3</option>
          </select>
        </div>

        <button className="btn btn-success w-100" onClick={handleAssign}>
          ✅ Assign Manager
        </button>
      </div>

      {/* Assignment History */}
      <div className="card mt-4 p-3 shadow">
        <h3 className="text-center text-secondary">📋 Assignment History</h3>
        {assignments.length === 0 ? (
          <p className="text-center text-muted">No assignments yet.</p>
        ) : (
          <table className="table table-striped text-center mt-3">
            <thead className="table-dark">
              <tr>
                <th>Warehouse</th>
                <th>Manager</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((a) => (
                <tr key={a.id}>
                  <td>{a.warehouse}</td>
                  <td>{a.manager}</td>
                  <td>{a.time}</td>
                  <td>
                    <span className="badge bg-success">{a.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AssignWarehouseManager;
