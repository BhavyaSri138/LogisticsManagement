import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import UserShipmentCard from "../../components/user/UserShipmentCard";

const MyShipments = () => {
  const [shipments, setShipments] = useState([]);
  const location = useLocation();

  // Fetch existing shipments on mount
  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const res = await fetch("http://localhost:3000/orders/order");
        if (!res.ok) throw new Error("Failed to fetch shipments");
        const data = await res.json();
        setShipments(data);
      } catch (err) {
        console.error("Error fetching shipments:", err);
      }
    };

    fetchShipments();
  }, []);

  // Prepend newly created shipment if passed via navigate state
  useEffect(() => {
    if (location.state?.newShipment) {
      setShipments((prev) => [location.state.newShipment, ...prev]);
      // Clear state to avoid duplicate adding on re-render
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <div className="container py-4">
      <div className="mb-4">
        <h1 className="h3 fw-bold text-dark">All Shipments</h1>
        <p className="text-muted">Track and manage all shipments in the system.</p>
      </div>

      <div className="d-flex flex-column">
        {shipments.length > 0 ? (
          shipments.map((shipment) => {
            const product = shipment.product || {};
            const productDetails = product.productDetails || {};

            return (
              <div key={shipment._id || shipment.orderId} className="mb-3">
                <UserShipmentCard
                  shipment={{
                    id: shipment.orderId,
                    description:
                      productDetails.description || product.productName || "No product details",
                    status: shipment.status,
                    shippedDate: shipment.orderPlacedDate
                      ? new Date(shipment.orderPlacedDate).toDateString()
                      : "N/A",
                    expectedDate: shipment.expectedDeliveryDate
                      ? new Date(shipment.expectedDeliveryDate).toDateString()
                      : "N/A",
                    destination: shipment.deliveryAddress?.address || "N/A",
                    carrier: shipment.assignDriver || "Not Assigned",
                    value: productDetails.price ? productDetails.price * shipment.quantity : "N/A",
                  }}
                />
              </div>
            );
          })
        ) : (
          <p className="text-muted">No shipments found.</p>
        )}
      </div>
    </div>
  );
};

export default MyShipments;
