import React from "react";

const WarehouseItem = ({ item }) => {
  return (
    <div className="border p-3 rounded shadow-sm bg-light">
      <h5 className="fw-bold">{item.name}</h5>
      <p><strong>ID:</strong> {item.id}</p>
      <p><strong>Quantity:</strong> {item.quantity}</p>
      <p><strong>Location:</strong> {item.location}</p>
    </div>
  );
};

export default WarehouseItem;
