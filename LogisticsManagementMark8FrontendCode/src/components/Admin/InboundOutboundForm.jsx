import React from "react";

const InboundOutboundForm = () => {
  return (
    <form className="space-y-3">
      <input
        type="text"
        placeholder="Shipment Name"
        className="border p-2 w-full rounded"
      />
      <input
        type="text"
        placeholder="Category"
        className="border p-2 w-full rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default InboundOutboundForm;
