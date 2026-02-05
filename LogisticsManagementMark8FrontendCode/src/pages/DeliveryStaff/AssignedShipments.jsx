import React, { useEffect, useState } from "react";
import ShipmentCard from "./DeliveryShipmentCard";

function AssignedShipments() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignedDrivers = async () => {
      try {
        const res = await fetch("http://localhost:3000/driver/assignedDrivers");
        const data = await res.json();

        if (data.success) {
          // Map the backend data to the shipment format
          const mappedShipments = data.data.map((driver, index) => ({
            id: index + 1,
            orderId: driver._id,
            customerName: driver.driverName,
            address: driver.address,
            status: "Assigned", // default status
            vehicleName: driver.vehicleName,
            vehiclePlateNo: driver.vehiclePlateNo,
            carrierName: driver.carrierName
          }));

          setShipments(mappedShipments);
        } else {
          console.error("Failed to fetch assigned drivers:", data.message);
        }
      } catch (err) {
        console.error("Error fetching assigned drivers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedDrivers();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setShipments((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
  };

  if (loading) {
    return <p className="text-center mt-4">Loading assigned drivers...</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">📦 Assigned Shipments</h2>
      <div className="row">
        {shipments.length > 0 ? (
          shipments.map((s) => (
            <div className="col-md-4" key={s.id}>
              <ShipmentCard shipment={s} onStatusChange={handleStatusChange} />
            </div>
          ))
        ) : (
          <p className="text-center">No assigned drivers found.</p>
        )}
      </div>
    </div>
  );
}

export default AssignedShipments;
