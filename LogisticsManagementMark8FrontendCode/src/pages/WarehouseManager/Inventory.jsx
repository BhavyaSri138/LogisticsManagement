import React, { useState, useEffect } from "react";
import "../../styles/admin/Inventory.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // edit state
  const [editingId, setEditingId] = useState(null);
  const [editProduct, setEditProduct] = useState({
    productName: "",
    subCategory: "",
    description: "",
    price: "",
    quantity: "",
    origin: "",
    location: "",
    rack: "",
  });

  // Fetch inventory from backend
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3000/stock/items", {
          method: "GET",
        });
        const data = await res.json();
        console.log("Fetched Inventory:", data);
        setInventory(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch inventory!");
      }
    }
    fetchData();
  }, []);

  const getStatus = (stock) => {
    if (stock === 0) return "out-of-stock";
    if (stock < 15) return "low-stock";
    return "in-stock";
  };

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = item.productName
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || item.subCategory === categoryFilter;
    const matchesStatus =
      statusFilter === "All" || getStatus(item.quantity) === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // ---------- Edit Product inline ----------
  const startEditing = (item) => {
    setEditingId(item._id);
    setEditProduct({
      productName: item.productName,
      subCategory: item.subCategory,
      description: item.productDetails?.description || "",
      price: item.productDetails?.price || "",
      quantity: item.quantity,
      origin: item.origin,
      location: item.location,
      rack: item.rack,
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditProduct({
      productName: "",
      subCategory: "",
      description: "",
      price: "",
      quantity: "",
      origin: "",
      location: "",
      rack: "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    const parsed =
      name === "quantity" || name === "price" ? Number(value) : value;
    setEditProduct((p) => ({ ...p, [name]: parsed }));
  };

  const handleSaveEdit = async (id) => {
    if (
      !editProduct.productName ||
      !editProduct.subCategory ||
      editProduct.quantity < 0 ||
      !editProduct.origin ||
      !editProduct.location ||
      !editProduct.rack ||
      editProduct.price <= 0
    ) {
      toast.error("Please fill all fields correctly!");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/stock/stock/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: editProduct.productName,
          subCategory: editProduct.subCategory,
          quantity: editProduct.quantity,
          origin: editProduct.origin,
          location: editProduct.location,
          rack: editProduct.rack,
          productDetails: {
            description: editProduct.description,
            price: editProduct.price,
          },
        }),
      });

      if (!res.ok) throw new Error("Update failed");
      toast.success("Product updated!");

      setInventory((prev) =>
        prev.map((item) =>
          item._id === id
            ? {
                ...item,
                productName: editProduct.productName,
                subCategory: editProduct.subCategory,
                quantity: editProduct.quantity,
                origin: editProduct.origin,
                location: editProduct.location,
                rack: editProduct.rack,
                productDetails: {
                  description: editProduct.description,
                  price: editProduct.price,
                },
              }
            : item
        )
      );
      setEditingId(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product!");
    }
  };

  // ---------- Delete Product ----------
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/stock/stock/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");

      setInventory((prev) => prev.filter((item) => item._id !== id));
      toast.error("Item deleted!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product!");
    }
  };

  return (
    <div className="warehouse-container">
      <ToastContainer />

      {/* Sidebar */}
      <div className="sidebar">
        <h4>Warehouse Manager</h4>
        <ul>
          <li>
            <Link to="/warehouse-dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/inventory">Inventory</Link>
          </li>
          <li>
            <Link to="/orders">Orders</Link>
          </li>
          <li>
            <Link to="/assign-driver">Assign Driver</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <Link to="/logout" className="logout-link">
              Logout
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="inventory-header">
          <h3>Inventory</h3>
          <div className="filters">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="fruits">Fruits</option>
              <option value="electronics">Electronics</option>
              <option value="beverages">Beverages</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>
        </div>

        {/* Inventory Table */}
        <table className="inventory-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Origin</th>
              <th>Location</th>
              <th>Rack</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>
                  {editingId === item._id ? (
                    <input
                      type="text"
                      name="productName"
                      value={editProduct.productName}
                      onChange={handleEditChange}
                      required
                    />
                  ) : (
                    item.productName
                  )}
                </td>
                <td>
                  {editingId === item._id ? (
                    <input
                      type="text"
                      name="subCategory"
                      value={editProduct.subCategory}
                      onChange={handleEditChange}
                      required
                    />
                  ) : (
                    item.subCategory
                  )}
                </td>
                <td>
                  {editingId === item._id ? (
                    <input
                      type="number"
                      name="quantity"
                      value={editProduct.quantity}
                      onChange={handleEditChange}
                      required
                      min="0"
                    />
                  ) : (
                    item.quantity
                  )}
                </td>
                <td>
                  {editingId === item._id ? (
                    <input
                      type="text"
                      name="origin"
                      value={editProduct.origin}
                      onChange={handleEditChange}
                      required
                    />
                  ) : (
                    item.origin
                  )}
                </td>
                <td>
                  {editingId === item._id ? (
                    <input
                      type="text"
                      name="location"
                      value={editProduct.location}
                      onChange={handleEditChange}
                      required
                    />
                  ) : (
                    item.location
                  )}
                </td>
                <td>
                  {editingId === item._id ? (
                    <input
                      type="text"
                      name="rack"
                      value={editProduct.rack}
                      onChange={handleEditChange}
                      required
                    />
                  ) : (
                    item.rack
                  )}
                </td>
                <td>
                  {editingId === item._id ? (
                    <input
                      type="number"
                      step="0.01"
                      name="price"
                      value={editProduct.price}
                      onChange={handleEditChange}
                      required
                      min="0.01"
                    />
                  ) : (
                    `₹${Number(item.productDetails?.price).toFixed(2)}`
                  )}
                </td>
                <td>
                  <span className={`status ${getStatus(item.quantity)}`}>
                    {getStatus(item.quantity).replace("-", " ")}
                  </span>
                </td>
                <td>
                  {editingId === item._id ? (
                    <>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => handleSaveEdit(item._id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={cancelEditing}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => startEditing(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventory;
