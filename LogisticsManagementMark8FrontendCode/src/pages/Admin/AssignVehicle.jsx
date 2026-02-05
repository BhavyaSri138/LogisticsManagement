import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AssignVehicle = () => {
  // Dummy data for shipments
  const shipments = [
    { id: "S1", name: "Shipment A" },
    { id: "S2", name: "Shipment B" },
    { id: "S3", name: "Shipment C" },
  ];

  // Dummy data for vehicles
  const vehicles = [
    { id: "V101", name: "Truck 101" },
    { id: "V202", name: "Van 202" },
    { id: "V303", name: "Bike 303" },
  ];

  // Preloaded dummy assignments
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      shipment: "Shipment A",
      vehicle: "Truck 101",
      time: "21-08-2025, 10:30 AM",
      status: "Assigned",
    },
    {
      id: 2,
      shipment: "Shipment B",
      vehicle: "Van 202",
      time: "21-08-2025, 11:15 AM",
      status: "Assigned",
    },
  ]);

  const [selectedShipment, setSelectedShipment] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");

  const handleAssign = () => {
    if (selectedShipment && selectedVehicle) {
      const newAssignment = {
        id: Date.now(),
        shipment: shipments.find((s) => s.id === selectedShipment)?.name,
        vehicle: vehicles.find((v) => v.id === selectedVehicle)?.name,
        time: new Date().toLocaleString(),
        status: "Assigned",
      };
      setAssignments([...assignments, newAssignment]);
      toast.success(
        `✅ Vehicle ${newAssignment.vehicle} assigned to ${newAssignment.shipment}`
      );
      setSelectedShipment("");
      setSelectedVehicle("");
    } else {
      toast.error("⚠️ Please select both shipment and vehicle!");
    }
  };

  const clearAssignments = () => {
    setAssignments([]);
    toast.info("🗑 Assignment history cleared");
  };

  return (
    <div className="container mt-5">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Assign Vehicle Card */}
      <div className="card p-4 shadow">
        <h3 className="fw-bold text-dark mb-4">🚚 Assign Vehicle</h3>

        {/* Select Shipment */}
        <div className="mb-3">
          <label className="form-label fw-bold">Select Shipment</label>
          <select
            className="form-select"
            value={selectedShipment}
            onChange={(e) => setSelectedShipment(e.target.value)}
          >
            <option value="">-- Choose Shipment --</option>
            {shipments.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Select Vehicle */}
        <div className="mb-3">
          <label className="form-label fw-bold">Select Vehicle</label>
          <select
            className="form-select"
            value={selectedVehicle}
            onChange={(e) => setSelectedVehicle(e.target.value)}
          >
            <option value="">-- Choose Vehicle --</option>
            {vehicles.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
        </div>

        <button className="btn btn-success w-100 mb-2" onClick={handleAssign}>
          ✅ Assign Vehicle
        </button>
        <button className="btn btn-outline-danger w-100" onClick={clearAssignments}>
          🗑 Clear Assignments
        </button>
      </div>

      {/* Assignment History */}
      <div className="card mt-4 p-3 shadow">
        <h4 className="text-center text-primary mb-3">📜 Assignment History</h4>
        {assignments.length === 0 ? (
          <p className="text-center text-muted">No assignments yet.</p>
        ) : (
          <table className="table table-striped text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>Shipment</th>
                <th>Vehicle</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((a) => (
                <tr key={a.id}>
                  <td>{a.shipment}</td>
                  <td>{a.vehicle}</td>
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

export default AssignVehicle;
