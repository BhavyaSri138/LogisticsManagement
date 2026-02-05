import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AssignRoute = () => {
  const [selectedRoute, setSelectedRoute] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");

  // History state - dynamic (initial dummy data)
  const [history, setHistory] = useState([
    {
      route: "Route A",
      driver: "Driver 1",
      time: "2025/08/21 09:00 AM",
      status: "Assigned",
    },
    {
      route: "Route B",
      driver: "Driver 2",
      time: "2025/08/20 04:30 PM",
      status: "Assigned",
    },
  ]);

  // Function to add new assignment
  const handleAssign = () => {
    if (selectedRoute && selectedDriver) {
      const newEntry = {
        route: selectedRoute,
        driver: selectedDriver,
        time: new Date().toLocaleString(), // current date-time
        status: "Assigned",
      };

      // Add new entry to history
      setHistory([newEntry, ...history]);

      // Reset dropdowns
      setSelectedRoute("");
      setSelectedDriver("");
    } else {
      alert("Please select both Route and Driver!");
    }
  };

  return (
    <div className="container mt-4">
      {/* Card for assignment form */}
      <div className="card shadow p-3 mb-4">
        <h2 className="text-primary text-center">🚚 Assign Delivery Route</h2>
        <div className="card-body">
          {/* Route dropdown */}
          <select
            className="form-control mb-3"
            value={selectedRoute}
            onChange={(e) => setSelectedRoute(e.target.value)}
          >
            <option value="">-- Choose Route --</option>
            <option value="Route A">Route A</option>
            <option value="Route B">Route B</option>
            <option value="Route C">Route C</option>
          </select>

          {/* Driver dropdown */}
          <select
            className="form-control mb-3"
            value={selectedDriver}
            onChange={(e) => setSelectedDriver(e.target.value)}
          >
            <option value="">-- Choose Driver --</option>
            <option value="Driver 1">Driver 1</option>
            <option value="Driver 2">Driver 2</option>
            <option value="Driver 3">Driver 3</option>
          </select>

          {/* Assign button */}
          <button className="btn btn-success w-100" onClick={handleAssign}>
            ✅ Assign Route
          </button>
        </div>
      </div>

      {/* Assignment History */}
      <div className="card shadow p-3">
        <h3 className="text-center text-secondary mb-3">📝 Assignment History</h3>
        <table className="table table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th>Route</th>
              <th>Driver</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={index}>
                <td>{item.route}</td>
                <td>{item.driver}</td>
                <td>{item.time}</td>
                <td>
                  <span className="badge bg-success">{item.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignRoute;
