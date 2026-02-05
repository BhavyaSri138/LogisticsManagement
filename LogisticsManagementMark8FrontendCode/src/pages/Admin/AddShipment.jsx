import React from "react";
import InboundOutboundForm from "../../components/Admin/InboundOutboundForm";

const AddShipment = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Add New Shipment</h2>
      <InboundOutboundForm />
    </div>
  );
};

export default AddShipment;
