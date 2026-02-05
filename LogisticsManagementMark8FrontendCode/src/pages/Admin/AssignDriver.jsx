import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/admin/AssignDriver.css";

const AssignDriver = () => {
  const [shipmentId, setShipmentId] = useState(""); // Mongo _id of order
  const [driverId, setDriverId] = useState("");     // Mongo _id of driver
  const [assignments, setAssignments] = useState([]);
  const [shipments, setShipments] = useState([]); // Orders from backend
  const [drivers, setDrivers] = useState([]);     // Drivers from backend
  const [role] = useState("Admin"); // Switch to "Viewer" to restrict

  // ✅ Fetch orders (assignDriver = null)
  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const res = await fetch("http://localhost:3000/orders/assignShipment");
        const data = await res.json();
        if (data.success) {
          setShipments(data.data); // backend returns data[]
        } else {
          toast.error("Failed to fetch orders");
        }
      } catch (error) {
        toast.error("Error fetching orders");
      }
    };

    // ✅ Fetch available drivers
    const fetchDrivers = async () => {
      try {
        const res = await fetch("http://localhost:3000/driver/driver");
        const data = await res.json();
        if (data.success) {
          setDrivers(data.data);
        } else {
          toast.error("Failed to fetch drivers");
        }
      } catch (error) {
        toast.error("Error fetching drivers");
      }
    };

    fetchShipments();
    fetchDrivers();
  }, []);

  // ✅ Assign driver API call
  const handleAssign = async (e) => {
    e.preventDefault();
    if (!shipmentId || !driverId) {
      toast.warning("Please select both shipment and driver.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/orders/assignShipment", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: shipmentId, // ✅ Mongo _id
          driverId: driverId,  // ✅ Mongo _id
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Driver assigned successfully");

        const assignedOrder = shipments.find((s) => s._id === shipmentId);
        const assignedDriver = drivers.find((d) => d._id === driverId);

        // Update assignment history
        const newAssign = {
          id: Date.now(),
          mongoOrderId: shipmentId, // Mongo _id
          orderId: assignedOrder?.orderId || "N/A", // custom orderId
          product: assignedOrder?.product?.productName || "N/A",
          driver: assignedDriver?.driverName || driverId,
          time: new Date().toLocaleString(),
        };

        setAssignments([newAssign, ...assignments]);

        // Remove assigned order from dropdown
        setShipments(shipments.filter((s) => s._id !== shipmentId));
        setShipmentId("");
        setDriverId("");
      } else {
        toast.error(data.message || "Failed to assign driver");
      }
    } catch (error) {
      toast.error("Error assigning driver");
    }
  };

  return (
    <div className="container mt-4">
      <ToastContainer />

      <div className="card-box">
        <h2 className="section-title">Assign Driver</h2>

        {role === "Admin" ? (
          <form
            onSubmit={handleAssign}
            className="border p-4 bg-light rounded shadow-sm"
          >
            {/* Shipment Dropdown */}
            <div className="mb-3">
              <label className="form-label">Select Shipment</label>
              <select
                className="form-select"
                value={shipmentId}
                onChange={(e) => setShipmentId(e.target.value)}
              >
                <option value="">-- Choose Shipment --</option>
                {shipments.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.orderId || s._id} - {s.product?.productName}
                  </option>
                ))}
              </select>
            </div>

            {/* Driver Dropdown */}
            <div className="mb-3">
              <label className="form-label">Select Driver</label>
              <select
                className="form-select"
                value={driverId}
                onChange={(e) => setDriverId(e.target.value)}
              >
                <option value="">-- Choose Driver --</option>
                {drivers.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.driverName} ({d.vehicleName})
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Assign Driver
            </button>
          </form>
        ) : (
          <p className="text-danger">
            You do not have permission to assign drivers.
          </p>
        )}
      </div>

      {/* Assignment History */}
      <div className="card-box mt-5">
        <h4 className="section-title">Assignment History</h4>
        {assignments.length === 0 ? (
          <p>No assignments yet.</p>
        ) : (
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Mongo Order ID</th>
                <th>Custom Order ID</th>
                <th>Product</th>
                <th>Driver</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assign) => (
                <tr key={assign.id}>
                  <td>{assign.mongoOrderId}</td>
                  <td>{assign.orderId}</td>
                  <td>{assign.product}</td>
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
  );
};

export default AssignDriver;
