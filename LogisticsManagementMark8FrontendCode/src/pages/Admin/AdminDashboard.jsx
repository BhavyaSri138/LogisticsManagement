import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalShipments: 0,
    totalDrivers: 0,
    totalWarehouses: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch("http://localhost:3000/orders/admin/dashboard");
        const data = await res.json();

        if (data.success) {
          setStats(data.stats);
          // Only keep top 3 activities
          setRecentActivity(data.recentActivity.slice(0, 3));
        } else {
          console.error("Failed to fetch dashboard stats:", data.message);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div>
      <h2 className="mb-4">Admin Dashboard</h2>

      {/* Dashboard Cards */}
      <div className="row">
        <div className="col-md-3 mb-3">
          <Card className="shadow-sm p-3">
            <h5>Total Users</h5>
            <p className="display-6">{stats.totalUsers}</p>
          </Card>
        </div>

        <div className="col-md-3 mb-3">
          <Card className="shadow-sm p-3">
            <h5>Shipments</h5>
            <p className="display-6">{stats.totalShipments}</p>
          </Card>
        </div>

        <div className="col-md-3 mb-3">
          <Card className="shadow-sm p-3">
            <h5>Drivers</h5>
            <p className="display-6">{stats.totalDrivers}</p>
          </Card>
        </div>

        <div className="col-md-3 mb-3">
          <Card className="shadow-sm p-3">
            <h5>Warehouses</h5>
            <p className="display-6">{stats.totalWarehouses}</p>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-4">
        <h4>Recent Activity (Top 3)</h4>
        <ul className="list-group">
          {recentActivity.length > 0 ? (
            recentActivity.map((activity, index) => (
              <li key={index} className="list-group-item">
                {activity}
              </li>
            ))
          ) : (
            <li className="list-group-item text-muted">
              No recent activity available
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
