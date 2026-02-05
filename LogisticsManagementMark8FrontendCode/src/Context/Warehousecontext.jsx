
import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
const WarehouseContext = createContext();

// Custom hook to use the context
export const useWarehouse = () => {
  return useContext(WarehouseContext);
};

// Provider component
export const WarehouseProvider = ({ children }) => {
  // Example states for warehouse, shipments, and drivers
  const [warehouses, setWarehouses] = useState([]);
  const [shipments, setShipments] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWarehouses = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/warehouses"); // Change to your API endpoint
      const data = await response.json();
      setWarehouses(data);
    } catch (error) {
      console.error("Error fetching warehouses:", error);
    } finally {
      setLoading(false);
    }
  };

  // Example: Fetch shipments
  const fetchShipments = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/shipments"); // Change to your API endpoint
      const data = await response.json();
      setShipments(data);
    } catch (error) {
      console.error("Error fetching shipments:", error);
    } finally {
      setLoading(false);
    }
  };

  // Example: Assign driver to shipment
  const assignDriver = (shipmentId, driverId) => {
    setShipments((prev) =>
      prev.map((shipment) =>
        shipment.id === shipmentId
          ? { ...shipment, driverId, status: "Assigned" }
          : shipment
      )
    );
  };

  // Load initial data when component mounts
  useEffect(() => {
    fetchWarehouses();
    fetchShipments();
  }, []);

  return (
    <WarehouseContext.Provider
      value={{
        warehouses,
        shipments,
        drivers,
        loading,
        fetchWarehouses,
        fetchShipments,
        assignDriver,
        setDrivers, // For updating driver list
      }}
    >
      {children}
    </WarehouseContext.Provider>
  );
};
