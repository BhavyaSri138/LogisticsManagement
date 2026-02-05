import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../styles/admin/Warehouse.css";
import { v4 as uuidv4 } from "uuid";

import InventoryTable from "../../components/Admin/InventoryTable";
import WarehouseItem from "../../components/Admin/WarehouseItem";

const Warehouse = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('Admin'); // Simulate role
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ name: '', quantity: '', location: '' });

  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await fetch("http://localhost:3000/stock/items", {
          method: "GET",
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log("Fetched Items:", data);
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
        toast.error("Failed to fetch items");
      }
    }

    fetchItems();
  }, []);

  // ✅ Safe filtering
  const filteredItems = items.filter(item => {
    const itemName = item?.name || item?.productName || "";
    return itemName.toLowerCase().includes(search.toLowerCase());
  });

  const handleDelete = (id) => {
    setItems(items.filter(item =>
      (item.id || item._id) !== id
    ));
    toast.error('Item deleted');
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setForm({
      name: item?.name || item?.productName || "",
      quantity: item?.quantity || "",
      location: item?.location || ""
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      setItems(items.map(i =>
        (i.id || i._id) === (editingItem.id || editingItem._id)
          ? { ...form, id: editingItem.id || editingItem._id }
          : i
      ));
      toast.success('Item updated');
    } else {
      const newItem = { ...form, id: uuidv4() };
      setItems([...items, newItem]);
      toast.success('Item added');
    }
    setEditingItem(null);
    setForm({ name: '', quantity: '', location: '' });
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <div className="card-box">
        <h2 className="section-title">Warehouse Inventory</h2>

        <div className="d-flex justify-content-between mb-3">
          <input
            type="text"
            className="form-control w-50"
            placeholder="Search item..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {role === 'Admin' && (
            <button
              className="btn btn-success ms-3"
              onClick={() => {
                setEditingItem(null);
                setForm({ name: '', quantity: '', location: '' });
              }}
            >
              + Add Item
            </button>
          )}
        </div>

        {/* ✅ Table view */}
        <InventoryTable items={filteredItems} />

        {/* ✅ Card view */}
        <div className="row mt-4">
          {filteredItems.map((item) => {
            const itemId = item.id || item._id || uuidv4();
            return (
              <div className="col-md-4 mb-3" key={itemId}>
                <WarehouseItem item={item} />
                {role === 'Admin' && (
                  <div className="mt-2 d-flex">
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(itemId)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ✅ Add/Edit Form */}
      {role === 'Admin' && (
        <div className="card-box mt-4">
          <h4 className="section-title">
            {editingItem ? 'Edit Item' : 'Add New Item'}
          </h4>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <input
                name="name"
                value={form.name}
                onChange={handleInputChange}
                placeholder="Item Name"
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <input
                name="quantity"
                type="number"
                value={form.quantity}
                onChange={handleInputChange}
                placeholder="Quantity"
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <input
                name="location"
                value={form.location}
                onChange={handleInputChange}
                placeholder="Location"
                className="form-control"
                required
              />
            </div>
            <button className="btn btn-primary w-100" type="submit">
              {editingItem ? 'Update Item' : 'Add Item'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Warehouse;
