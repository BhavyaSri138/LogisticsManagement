import React, { useEffect, useState } from "react";
import UserShipmentCard from "../../components/user/UserShipmentCard";

const ShipmentHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/orders/order")
      .then((res) => res.json())
      .then((data) => {
        const delivered = data.filter((order) => order.status === "Delivered");
        setHistory(delivered);
      })
      .catch((err) => console.error("Error fetching shipment history:", err));
  }, []);

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">📜 Shipment History</h2>
      {history.length > 0 ? (
        history.map((shipment) => {
          const productDetails = shipment.product?.productDetails || {};
          return (
            <div key={shipment._id} className="mb-3">
              <UserShipmentCard
                shipment={{
                  id: shipment.orderId,
                  description: productDetails.description || shipment.product?.productName || "No product details",
                  status: shipment.status,
                  shippedDate: new Date(shipment.orderPlacedDate).toDateString(),
                  expectedDate: new Date(shipment.expectedDeliveryDate).toDateString(),
                  destination: shipment.deliveryAddress?.address || "N/A",
                  carrier: shipment.assignDriver?.name || "Not Assigned",
                  value: productDetails.price ? productDetails.price * shipment.quantity : "N/A",
                }}
              />
            </div>
          );
        })
      ) : (
        <p>No shipment history found.</p>
      )}
    </div>
  );
};

export default ShipmentHistory;
