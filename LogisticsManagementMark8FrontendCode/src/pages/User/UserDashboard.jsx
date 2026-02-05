import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Package, TrendingUp, Clock, CheckCircle } from "lucide-react";
import UserShipmentCard from "../../components/user/UserShipmentCard";

const UserDashboard = () => {
  const [stats, setStats] = useState([]);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  // Fetch all orders and derive stats
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:3000/orders/order");
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data);

        // Compute stats dynamically
        const totalOrders = data.length;
        const activeOrders = data.filter((o) => o.status === "In Transit" || o.status === "Pending").length;
        const deliveredOrders = data.filter((o) => o.status === "Delivered").length;
        const totalValue = data.reduce((sum, o) => {
          const price = o.product?.productDetails?.price || 0;
          return sum + price * (o.quantity || 1);
        }, 0);

        const mappedStats = [
          { title: "Total Shipments", value: totalOrders, change: "+5%", icon: Package, color: "primary" },
          { title: "Active Shipments", value: activeOrders, change: "+2%", icon: Clock, color: "warning" },
          { title: "Delivered", value: deliveredOrders, change: "+8%", icon: CheckCircle, color: "success" },
          { title: "Total Value", value: `₹${totalValue}`, change: "+12%", icon: TrendingUp, color: "info" },
        ];

        setStats(mappedStats);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container py-4">
      {/* Dashboard Header */}
      <div className="mb-4">
        <h1 className="h3 fw-bold text-dark">Dashboard</h1>
        <p className="text-muted">Welcome back! Here's what's happening with your shipments.</p>
      </div>

      {/* Stats Grid */}
      <div className="row g-4 mb-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="col-12 col-md-6 col-lg-3">
              <div className="card shadow-sm">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <p className="text-muted mb-1 small">{stat.title}</p>
                    <h5 className="fw-bold mb-0">{stat.value}</h5>
                    <small className="text-success">{stat.change} from last month</small>
                  </div>
                  <div className={`rounded-circle bg-${stat.color} bg-opacity-10 p-3`}>
                    <Icon className={`text-${stat.color}`} size={24} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Shipments */}
      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="h5 fw-semibold">Recent Shipments</h2>
            <a href="/user/my-shipments" className="text-primary text-decoration-none small fw-semibold">
              View All
            </a>
          </div>

          <div className="d-flex flex-column">
            {orders.length === 0 ? (
              <p className="text-muted">No shipments available.</p>
            ) : (
              orders.slice(0, 3).map((shipment) => {
                const product = shipment.product || {};
                const productDetails = product.productDetails || {};

                return (
                  <div key={shipment._id || shipment.orderId} className="mb-3">
                    <UserShipmentCard
                      shipment={{
                        id: shipment.orderId,
                        description: productDetails.description || product.productName || "No product details",
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
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="col-12 col-lg-4">
          <h2 className="h6 fw-semibold mb-3">Quick Actions</h2>
          <div className="d-flex flex-column gap-3">
            <div
              className="p-3 rounded text-white"
              style={{ backgroundColor: "#0d6efd", cursor: "pointer" }}
              onClick={() => navigate("/user/track-shipment")}
            >
              <h6 className="mb-1 fw-bold">Track a Shipment</h6>
              <small>Enter tracking number to get real-time updates</small>
            </div>
            <div
              className="p-3 rounded text-white"
              style={{ backgroundColor: "#198754", cursor: "pointer" }}
              onClick={() => navigate("/user/create-shipment")}
            >
              <h6 className="mb-1 fw-bold">Create New Shipment</h6>
              <small>Start a new shipping request</small>
            </div>
            <div
              className="p-3 rounded text-white"
              style={{ backgroundColor: "#6c757d", cursor: "pointer" }}
              onClick={() => navigate("/user/shipment-history")}
            >
              <h6 className="mb-1 fw-bold">Shipment History</h6>
              <small>View all completed shipments</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
