import React, { useState } from 'react';
const initialInventory = [
  { id: 1, name: 'Laptop', quantity: 50, location: 'Aisle 1, Shelf 3' },
  { id: 2, name: 'Monitor', quantity: 120, location: 'Aisle 2, Shelf 1' },
  { id: 3, name: 'Keyboard', quantity: 200, location: 'Aisle 1, Shelf 5' },
];

function WarehouseServices() {
  const [inventory, setInventory] = useState(initialInventory);
  const [newProduct, setNewProduct] = useState({ name: '', quantity: '', location: '' });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const addProduct = () => {
    if (!newProduct.name || !newProduct.quantity || !newProduct.location) {
      alert("Please fill out all fields.");
      return;
    }
    const newId = inventory.length > 0 ? Math.max(...inventory.map(p => p.id)) + 1 : 1;
    setInventory([...inventory, { ...newProduct, id: newId }]);
    setNewProduct({ name: '', quantity: '', location: '' });
    setShowModal(false);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
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
          <h3>Warehouse Overview</h3>
          <button className="btn btn-primary my-2" onClick={() => setShowModal(true)}>Add New Product</button>

          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>{product.location}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Add Product Modal */}
          {showModal && (
            <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Add New Product</h5>
                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Product Name</label>
                      <input type="text" className="form-control" name="name" value={newProduct.name} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Quantity</label>
                      <input type="number" className="form-control" name="quantity" value={newProduct.quantity} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Location</label>
                      <input type="text" className="form-control" name="location" value={newProduct.location} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                    <button type="button" className="btn btn-success" onClick={addProduct}>Add Product</button>
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

export default WarehouseServices;