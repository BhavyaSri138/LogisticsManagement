import React, { useEffect, useState } from "react";
import "../../styles/admin/WarehouseDashboard.css";
import { Link } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

function WarehouseDashboard() {
  // State for data from backend
  const [monthlyInventory, setMonthlyInventory] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [stats, setStats] = useState({ totalItems: 0, lowStockItems: 0, activeOrders: 0 });

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff6b6b", "#8dd1e1"];

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3000/orders/getshipment", {
          method: "GET",
        });
        const data = await res.json();

        // Update state with backend data
        setMonthlyInventory(data.monthlyInventory || []);
        setCategoryData(data.categoryData || []);
        setRecentActivity(data.recentActivity || []);
        setStats(data.stats || { totalItems: 0, lowStockItems: 0, activeOrders: 0 });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h4>Warehouse Manager</h4>
        <ul>
          <li><Link to="/warehouse-dashboard">Dashboard</Link></li>
          <li><Link to="/inventory">Inventory</Link></li>
          <li><Link to="/orders">Orders</Link></li>
          <li><Link to="/assign-driver">Assign Driver</Link></li>
          {/* <li><Link to="/settings">Settings</Link></li> */}
          <li><Link to="/logout" className="logout-link">Logout</Link></li>
        </ul>
      </div>

      {/* Main Dashboard */}
      <div className="main-dashboard">
        <h3 className="mb-3">📊 Dashboard</h3>

        {/* Top Stats */}
        <div className="stats-cards">
          <div className="card">
            <h5>Total Items</h5>
            <h2>{stats.totalItems}</h2>
            <p>+2.1% from last month</p>
          </div>
          <div className="card warning">
            <h5>Low Stock Items</h5>
            <h2>{stats.lowStockItems}</h2>
            <p>Requires attention</p>
          </div>
          <div className="card success">
            <h5>Active Orders</h5>
            <h2>{stats.activeOrders}</h2>
            <p>+12% from yesterday</p>
          </div>
          <div className="card info">
            <h5>Staff On Duty</h5>
            <h2>18</h2>
            <p>3 shifts active</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="charts-section">
          <div className="chart-box">
            <h5>Monthly Inventory Flow</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyInventory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="incoming" fill="#8884d8" />
                <Bar dataKey="outgoing" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-box">
            <h5>Inventory by Category</h5>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="recent-activity">
          <h5>Recent Activity</h5>
          <ul>
            {recentActivity.map((activity, index) => (
              <li key={index}>
                <span
                  className={`dot ${
                    activity.status === "Pending" ? "yellow" :
                    activity.status === "Delivered" ? "green" : "blue"
                  }`}
                ></span> 
                Order #{activity.orderId} - {activity.status} <br />
                <small>{new Date(activity.timestamp).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default WarehouseDashboard;
