import React, { useState, useEffect } from "react";

function DeliveryDashboard() {
  const [loading, setLoading] = useState(true);
  const [shipments, setShipments] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const driverId = "68c95c5cda61dd72a6f3961b";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // ✅ Fetch orders assigned to driver
        const res = await fetch(
          `http://localhost:3000/driver/driver/orders/${driverId}`
        );
        if (!res.ok) throw new Error("Failed to fetch driver orders");

        const data = await res.json();
        console.log("Driver Orders API response:", data);

        setShipments(data);

        // ✅ Notifications from orders
        setNotifications(""
        );

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [driverId]);

  const handleStatusChange = (id, newStatus) => {
    const updatedShipments = shipments.map((s) =>
      s._id === id ? { ...s, status: newStatus } : s
    );
    setShipments(updatedShipments);

    // ✅ Update status in backend
    fetch(`http://localhost:3000/orders/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    }).catch((err) => console.error("Failed to update status:", err));
  };

  if (loading) return <p className="text-center">Loading assigned orders...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">🚚 Delivery Staff Dashboard</h2>

      {/* Assigned Shipments */}
      <div className="card shadow mb-4">
        <div className="card-header bg-primary text-white">
          📦 Assigned Shipments
        </div>
        <div className="card-body">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Order ID</th>
                <th>Quantity</th>
                <th>Destination</th>
                <th>Status</th>
                <th>Expected Delivery</th>
                <th>Update Status</th>
              </tr>
            </thead>
            <tbody>
              {shipments.length > 0 ? (
                shipments.map((s) => (
                  <tr key={s._id}>
                    <td>#{s._id}</td>
                    <td>{s.quantity}</td>
                    <td>{s.deliveryAddress?.address || "N/A"}</td>
                    <td>{s.status}</td>
                    <td>
                      {s.expectedDeliveryDate
                        ? new Date(s.expectedDeliveryDate).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>
                      <select
                        className="form-select"
                        value={s.status}
                        onChange={(e) =>
                          handleStatusChange(s._id, e.target.value)
                        }
                      >
                        <option>Pending</option>
                        <option>Confirmed</option>
                        <option>In Transit</option>
                        <option>Out for Delivery</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No shipments assigned
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notifications */}
      <div className="card shadow mb-4">
        <div className="card-header bg-warning text-dark">🔔 Notifications</div>
        <div className="card-body">
          <ul className="list-group">
            {notifications.length > 0 ? (
              notifications.map((note, index) => (
                <li key={index} className="list-group-item">
                  {note}
                </li>
              ))
            ) : (
              <li className="list-group-item">No notifications</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DeliveryDashboard;








