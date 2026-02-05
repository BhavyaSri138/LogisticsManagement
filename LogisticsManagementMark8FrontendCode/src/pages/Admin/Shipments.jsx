import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/admin/Shipment.css";

const Shipments = () => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    async function fetchShipments() {
      try {
        const res = await fetch("http://localhost:3000/orders/order"); // ✅ backend URL
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = await res.json();
        console.log("API response:", data);
        setShipments(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Failed to load shipments");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchShipments();
  }, []);

  if (loading) return <p>Loading shipments...</p>;
  if (error) return <p>{error}</p>;

  const filteredShipments = shipments.filter((shipment) => {
    const matchesSearch = shipment.orderId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? shipment.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="shipments-container">
      <h2>Shipments</h2>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search by Order ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In Transit">In Transit</option>
          <option value="Out for Delivery">Out for Delivery</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      {/* Shipment List */}
      <div className="shipments-list">
        {filteredShipments.length > 0 ? (
          filteredShipments.map((shipment) => (
            <div key={shipment._id} className="shipment-card">
              <h3>{shipment.orderId}</h3>
              <p><strong>Status:</strong> {shipment.status}</p>
              <p><strong>Quantity:</strong> {shipment.quantity}</p>
              <p><strong>Destination:</strong> {shipment.deliveryAddress?.address}</p>
              <p><strong>ETA:</strong> {new Date(shipment.expectedDeliveryDate).toDateString()}</p>
              {/* <p><strong>Driver:</strong> {shipment.assignDriver ? shipment.assignDriver.name : "Not Assigned"}</p> */}
              {/* <Link to={`/admin/shipments/${shipment.orderId}`} className="details-btn">
                View Details
              </Link> */}
            </div>
          ))
        ) : (
          <p className="no-results">No shipments found.</p>
        )}
      </div>
    </div>
  );
};

export default Shipments;
