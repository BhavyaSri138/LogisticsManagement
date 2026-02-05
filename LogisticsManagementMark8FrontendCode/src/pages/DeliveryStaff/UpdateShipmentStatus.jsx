import React from "react";

function UpdateShipmentStatus({ currentStatus, onChange }) {
  return (
    <div>
      <label className="form-label">Update Status:</label>
      <select
        className="form-select"
        value={currentStatus}
        onChange={(e) => onChange(e.target.value)}
      >
        <option>Assigned</option>
        <option>Picked Up</option>
        <option>In Transit</option>
        <option>Delivered</option>
      </select>
    </div>
  );
}

export default UpdateShipmentStatus;
