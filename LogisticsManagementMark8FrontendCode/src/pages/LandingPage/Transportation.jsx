import { Link } from "react-router-dom";

function Transportation() {
  const vehicles = [
    { id: 1, type: "Truck", capacity: "10 Tons", status: "Available" },
    { id: 2, type: "Van", capacity: "2 Tons", status: "On Trip" },
    { id: 3, type: "Container", capacity: "25 Tons", status: "Available" },
  ];

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Transportation Services</h1>
      <p className="text-center mb-4">
        We offer reliable transportation across regions with real-time tracking
        of shipments.
      </p>

      <div className="table-responsive">
        <table className="table table-hover table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Vehicle Type</th>
              <th>Capacity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v) => (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.type}</td>
                <td>{v.capacity}</td>
                <td>{v.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transportation;