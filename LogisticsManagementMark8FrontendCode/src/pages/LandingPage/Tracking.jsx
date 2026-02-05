import { Link } from "react-router-dom";

function Tracking() {
  const shipments = [
    { id: "SHP001", customer: "John Doe", status: "In Transit", expected: "2025-09-16" },
    { id: "SHP002", customer: "Jane Smith", status: "Delivered", expected: "2025-09-12" },
    { id: "SHP003", customer: "Michael Brown", status: "Pending Pickup", expected: "2025-09-15" },
  ];

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Tracking Services</h1>
      <p className="text-center mb-4">
        Get real-time updates on your shipment status and delivery progress.
      </p>

      <div className="table-responsive">
        <table className="table table-bordered table-striped text-center">
          <thead className="table-dark">
            <tr>
              <th>Shipment ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Expected Delivery</th>
            </tr>
          </thead>
          <tbody>
            {shipments.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.customer}</td>
                <td>{s.status}</td>
                <td>{s.expected}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tracking;