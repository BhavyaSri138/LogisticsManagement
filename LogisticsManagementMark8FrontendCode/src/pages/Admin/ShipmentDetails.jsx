import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/admin/Shipment.css";

const ShipmentDetails = () => {
  const { id } = useParams(); // orderId from route
  const navigate = useNavigate();
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchShipment() {
      try {
        const res = await fetch(`http://localhost:3000/orders/order/${id}`);
        if (!res.ok) throw new Error("Failed to fetch shipment details");
        const data = await res.json();
        console.log("Fetched Shipment:", data);
        setShipment(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchShipment();
  }, [id]);

  if (loading) {
    return <p className="loading">Loading shipment details...</p>;
  }

  if (!shipment) {
    return <p className="no-results">Shipment not found.</p>;
  }

  return (
    <div className="shipment-details">
      <h2>Shipment Overview</h2>
      <div className="shipment-card big">
        <h3>Shipment ID: {shipment.orderId}</h3>
        <p><strong>Status:</strong> {shipment.status}</p>
        <p><strong>Type:</strong> {shipment.orderType}</p>
        <p><strong>Quantity:</strong> {shipment.quantity}</p>
        <p><strong>Customer:</strong> {shipment.deliveryAddress?.name}</p>
        <p><strong>Address:</strong> {shipment.deliveryAddress?.address}</p>
        <p><strong>Contact:</strong> {shipment.deliveryAddress?.contact}</p>
        <p><strong>Expected Delivery:</strong> {new Date(shipment.expectedDeliveryDate).toDateString()}</p>
        <p><strong>Order Placed:</strong> {new Date(shipment.orderPlacedDate).toDateString()}</p>
        <p><strong>Driver:</strong> {shipment.assignDriver || "Not Assigned"}</p>
      </div>
      <button onClick={() => navigate(-1)} className="back-btn">⬅ Back</button>
    </div>
  );
};

export default ShipmentDetails;
