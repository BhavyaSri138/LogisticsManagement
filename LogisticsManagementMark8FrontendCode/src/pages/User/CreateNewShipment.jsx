import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const CreateNewShipment = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    productId: "",
    quantity: 1,
    deliveryName: "",
    deliveryAddress: "",
    deliveryContact: "",
    orderType: "Outbound",
    expectedDeliveryDate: "",
  });

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/stock/items");
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        console.log("Fetched products:", data);

        // ✅ your backend returns an array, not { stocks: [] }
        setProducts(Array.isArray(data) ? data : data.stocks || []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.productId) {
      alert("Please select a product");
      return;
    }

    const orderId = "ORD-" + uuidv4().split("-")[0].toUpperCase();

    const payload = {
      orderId,
      user: "66ec8f4a12c3456789abcd01", // dummy user
      product: form.productId,
      quantity: Number(form.quantity),
      deliveryAddress: {
        name: form.deliveryName,
        address: form.deliveryAddress,
        contact: form.deliveryContact,
      },
      orderType: form.orderType,
      expectedDeliveryDate: form.expectedDeliveryDate,
    };

    try {
      const res = await fetch("http://localhost:3000/orders/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create shipment");

      alert(`✅ Shipment Created! Order ID: ${orderId}`);
      navigate("/user/my-shipments");
    } catch (err) {
      console.error(err);
      alert("❌ Error creating shipment");
    }
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">📦 Create New Shipment</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        {/* Product Dropdown */}
        <div className="mb-3">
          <label className="form-label">Select Product</label>
          <select
            className="form-select"
            value={form.productId}
            onChange={(e) => setForm({ ...form, productId: e.target.value })}
            required
          >
            <option value="">-- Choose a product --</option>
            {loading ? (
              <option disabled>Loading products...</option>
            ) : products.length === 0 ? (
              <option disabled>No products available</option>
            ) : (
              products.map((p) => (
                < option key = { p._id } value = { p._id } >
                   { p.productName } - ₹{p.productDetails?.price || 0}
                </option>

          ))
            )}
        </select>
    </div>

        {/* Quantity */ }
  <div className="mb-3">
    <label className="form-label">Quantity</label>
    <input
      type="number"
      min="1"
      className="form-control"
      value={form.quantity}
      onChange={(e) => setForm({ ...form, quantity: e.target.value })}
      required
    />
  </div>

  {/* Delivery Details */ }
        <div className="mb-3">
          <label className="form-label">Recipient Name</label>
          <input
            className="form-control"
            value={form.deliveryName}
            onChange={(e) =>
              setForm({ ...form, deliveryName: e.target.value })
            }
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Delivery Address</label>
          <input
            className="form-control"
            value={form.deliveryAddress}
            onChange={(e) =>
              setForm({ ...form, deliveryAddress: e.target.value })
            }
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contact Number</label>
          <input
            className="form-control"
            value={form.deliveryContact}
            onChange={(e) =>
              setForm({ ...form, deliveryContact: e.target.value })
            }
            required
          />
        </div>

  {/* Order Type */ }
  <div className="mb-3">
    <label className="form-label">Order Type</label>
    <select
      className="form-select"
      value={form.orderType}
      onChange={(e) =>
        setForm({ ...form, orderType: e.target.value })
      }
    >
      <option value="Inbound">Inbound</option>
      <option value="Outbound">Outbound</option>
    </select>
  </div>

  {/* Expected Delivery Date */ }
        <div className="mb-3">
          <label className="form-label">Expected Delivery Date</label>
          <input
            type="date"
            className="form-control"
            value={form.expectedDeliveryDate}
            onChange={(e) =>
              setForm({ ...form, expectedDeliveryDate: e.target.value })
            }
            required
          />
        </div>

        <button type="submit" className="btn btn-success">
          ✅ Create Shipment
        </button>
      </form >
    </div >
  );
};

export default CreateNewShipment;
