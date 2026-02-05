import React, { useState } from 'react';

// This is a sample list of shipments. In a real app, this would come from an API.
const initialShipments = [
  { id: 1, trackingNumber: 'SHP-12345', status: 'In Transit', origin: 'New York', destination: 'Los Angeles' },
  { id: 2, trackingNumber: 'SHP-67890', status: 'Delivered', origin: 'Chicago', destination: 'Houston' },
  { id: 3, trackingNumber: 'SHP-11223', status: 'Pending', origin: 'San Francisco', destination: 'Miami' },
];

function ShipmentServices() {
  const [shipments, setShipments] = useState(initialShipments);
  const [newShipment, setNewShipment] = useState({ trackingNumber: '', status: '', origin: '', destination: '' });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setNewShipment({ ...newShipment, [e.target.name]: e.target.value });
  };

  const addShipment = () => {
    if (!newShipment.trackingNumber || !newShipment.status || !newShipment.origin || !newShipment.destination) {
      alert("Please fill out all fields.");
      return;
    }
    const newId = shipments.length > 0 ? Math.max(...shipments.map(s => s.id)) + 1 : 1;
    setShipments([...shipments, { ...newShipment, id: newId }]);
    setNewShipment({ trackingNumber: '', status: '', origin: '', destination: '' });
    setShowModal(false);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar - This could be a reusable component */}
        <div className="col-md-3 bg-dark text-white min-vh-100 p-3">
          <h4>Admin Panel</h4>
          <ul className="nav flex-column">
            <li className="nav-item"><a className="nav-link text-white" href="#">User Management</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="#">Shipment Overview</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="#">Warehouse Overview</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="#">Assign Tasks</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="#">Reports</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="#">Settings</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="#">Logout</a></li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-9 p-4">
          <h3>Shipment Overview</h3>
          <button className="btn btn-primary my-2" onClick={() => setShowModal(true)}>Add New Shipment</button>

          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>Tracking Number</th>
                <th>Status</th>
                <th>Origin</th>
                <th>Destination</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((shipment) => (
                <tr key={shipment.id}>
                  <td>{shipment.trackingNumber}</td>
                  <td>{shipment.status}</td>
                  <td>{shipment.origin}</td>
                  <td>{shipment.destination}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Add Shipment Modal */}
          {showModal && (
            <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Add New Shipment</h5>
                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Tracking Number</label>
                      <input type="text" className="form-control" name="trackingNumber" value={newShipment.trackingNumber} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select className="form-select" name="status" value={newShipment.status} onChange={handleChange}>
                        <option value="">Select Status</option>
                        <option value="Pending">Pending</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Origin</label>
                      <input type="text" className="form-control" name="origin" value={newShipment.origin} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Destination</label>
                      <input type="text" className="form-control" name="destination" value={newShipment.destination} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                    <button type="button" className="btn btn-success" onClick={addShipment}>Add Shipment</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShipmentServices;