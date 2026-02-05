import React from "react";

const AssignmentHistory = () => {
  return (
    <div className="border rounded p-4 shadow">
      <h3 className="font-semibold">Assignment History</h3>
      <ul className="list-disc ml-6">
        <li>Driver A → Shipment #101</li>
        <li>Driver B → Shipment #102</li>
      </ul>
    </div>
  );
};

export default AssignmentHistory;
