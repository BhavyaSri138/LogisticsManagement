import React from "react";

const DriverAssignForm = () => {
  return (
    <form className="space-y-3">
      <input type="text" placeholder="Driver Name" className="border p-2 w-full rounded" />
      <input type="text" placeholder="Shipment ID" className="border p-2 w-full rounded" />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Assign</button>
    </form>
  );
};

export default DriverAssignForm;
