import { Link } from "react-router-dom";

function Warehousing() {
  const warehouses = [
    { id: 1, location: "Delhi", capacity: "5000 sq.ft", status: "Available" },
    { id: 2, location: "Mumbai", capacity: "10,000 sq.ft", status: "Full" },
    { id: 3, location: "Bangalore", capacity: "7500 sq.ft", status: "Available" },
  ];

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Warehousing Services</h1>
      <p className="text-center mb-4">
        We provide secure storage facilities for your goods with modern inventory
        management systems.
      </p>

      <div className="table-responsive">
        <table className="table table-bordered table-striped text-center">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Location</th>
              <th>Capacity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {warehouses.map((wh) => (
              <tr key={wh.id}>
                <td>{wh.id}</td>
                <td>{wh.location}</td>
                <td>{wh.capacity}</td>
                <td>{wh.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Warehousing;