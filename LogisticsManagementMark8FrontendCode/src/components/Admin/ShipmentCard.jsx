import React from "react";

const ShipmentCard = ({ shipment }) => {
  return (
    <div className="border p-4 rounded-lg shadow bg-white">
      <h3 className="text-lg font-semibold">Shipment ID: {shipment.id}</h3>
      <p>Status: {shipment.status}</p>
      <p>Origin: {shipment.origin}</p>
      <p>Destination: {shipment.destination}</p>
      <p>ETA: {shipment.eta}</p>
      <p>Carrier: {shipment.carrier}</p>
    </div>
  );
};

export default ShipmentCard;
