import React from "react";

const InventoryTable = ({ items }) => {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Order ID</th>
            <th>Item Name</th>
            <th>Sub Category</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td>{item.orderId || "N/A"}</td>
              <td>{item.itemName || "N/A"}</td>
              <td>{item.subCategory || "N/A"}</td>
              <td>{item.quantity ?? "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
