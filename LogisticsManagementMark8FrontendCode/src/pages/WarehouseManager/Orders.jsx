import React, { useState, useEffect } from "react";
import { toast } from "react-toastify"; // ✅ for success/error notifications

function DeliveryDashboard() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]); // ✅ renamed shipments → orders
  const [notifications, setNotifications] = useState([]);

  const driverId = "68c95c5cda61dd72a6f3961b"; // mock driver id

  // ✅ Fetch driver orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/driver/driver/orders/${driverId}`
        );
        if (!res.ok) throw new Error("Failed to fetch driver orders");

        const data = await res.json();
        console.log("Driver Orders API response:", data);

        setOrders(data);

        // ✅ Notifications setup (example: from orders list)
        const notes = data.map(
          (o) =>
            `Order #${o._id} is currently ${o.status || "Pending"}`
        );
        setNotifications(notes);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch driver orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [driverId]);

  // ✅ Update order status
  const handleStatusChange = async (id, newStatus) => {
    try {
      const order = orders.find((o) => o._id === id);

      const res = await fetch("http://localhost:3000/orders/order", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: order._id, // custom orderId
          driverId: order.assignDriver?._id || driverId, // fallback to current driver
          status: newStatus,
        }),
      });

      if (!res.ok) throw new Error("Failed to update order");
      const data = await res.json();

      // ✅ update UI
      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, ...data.order } : o))
      );

      toast.success("Order updated!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update order!");
    }
  };

  if (loading) return <p className="text-center">Loading assigned orders...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">🚚 Delivery Staff Dashboard</h2>

      {/* Assigned Orders */}
      <div className="card shadow mb-4">
        <div className="card-header bg-primary text-white">
          📦 Assigned Orders
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
              {orders.length > 0 ? (
                orders.map((o) => (
                  <tr key={o._id}>
                    <td>#{o._id}</td>
                    <td>{o.quantity}</td>
                    <td>{o.deliveryAddress?.address || "N/A"}</td>
                    <td>{o.status}</td>
                    <td>
                      {o.expectedDeliveryDate
                        ? new Date(o.expectedDeliveryDate).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>
                      <select
                        className="form-select"
                        value={o.status}
                        onChange={(e) =>
                          handleStatusChange(o._id, e.target.value)
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
                    No orders assigned
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
