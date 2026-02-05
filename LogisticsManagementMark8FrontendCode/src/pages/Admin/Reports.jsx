import React, { useEffect, useState } from "react";
import InventoryTable from "../../components/Admin/InventoryTable";

const Reports = () => {
  const [shipmentStats, setShipmentStats] = useState({
    total: 0,
    delivered: 0,
    pending: 0,
    delayed: 0,
  });
  const [topDrivers, setTopDrivers] = useState([]);
  const [pendingGoods, setPendingGoods] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch("http://localhost:3000/orders/analytics");
        const data = await res.json();

        if (data.success) {
          setShipmentStats(data.report.logistics || {});
          setTopDrivers(data.report.topDrivers || []);
          setPendingGoods(data.report.pendingGoods || []);
        } else {
          console.error("Failed to fetch analytics:", data.message);
        }
      } catch (err) {
        console.error("Error fetching analytics:", err);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-10 offset-md-1 p-4">
          <h2 className="mb-4 text-primary">📊 Logistics Reports & Analytics</h2>

          {/* Shipment Stats */}
          <div className="row mb-4">
            {Object.entries(shipmentStats).map(([key, value], index) => (
              <div key={index} className="col-md-3">
                <div className="card text-center shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title text-capitalize">{key}</h5>
                    <p className="card-text fs-4 fw-bold">{value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Top Drivers */}
          <div className="card mb-4 shadow-sm">
            <div className="card-header fw-bold">🚚 Top Performing Drivers</div>
            <ul className="list-group list-group-flush">
              {topDrivers.length > 0 ? (
                topDrivers.map((driver, i) => (
                  <li key={i} className="list-group-item">
                    {driver.driverName} - <strong>{driver.deliveries}</strong> deliveries
                  </li>
                ))
              ) : (
                <li className="list-group-item text-muted">
                  No driver performance data available
                </li>
              )}
            </ul>
          </div>

          {/* Pending Goods */}
          <div className="card mb-4 shadow-sm">
            <div className="card-header fw-bold">📦 Pending Goods List</div>
            {pendingGoods.length > 0 ? (
              <InventoryTable items={pendingGoods} />
            ) : (
              <div className="p-3 text-muted">No pending goods</div>
            )}
          </div>

          {/* Future: Graphs/Analytics
          <div className="card shadow-sm mb-5">
            <div className="card-body text-muted">
              📈 <em>Analytics graphs will be added in the future.</em>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Reports;
