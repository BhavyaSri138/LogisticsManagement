import React ,{useEffect,useState}from "react";
import { useNavigate } from "react-router-dom";

const AssignTasks = () => {
  const navigate = useNavigate();

  const taskOptions = [
    {
      title: "Assign Driver",
      description: "Allocate drivers to shipments.",
      route: "/admin/assign-driver",
    },
    {
      title: "Assign Vehicle",
      description: "Link vehicles for deliveries.",
      route: "/admin/assign-vehicle",
    },
    {
      title: "Assign Manager",
      description: "Appoint managers to warehouses.",
      route: "/admin/assign-manager",
    },
    {
      title: "Assign Route",
      description: "Plan and assign delivery routes.",
      route: "/admin/assign-route",
    },
  ];

      useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3000/shipments", {
          method: "GET"
        });
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Assign Tasks</h1>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {taskOptions.map((task, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              width: "220px",
              textAlign: "center",
              boxShadow: "2px 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ fontSize: "18px" }}>{task.title}</h2>
            <p style={{ fontSize: "14px", color: "#555" }}>{task.description}</p>
            <button
              style={{
                marginTop: "10px",
                padding: "8px 15px",
                border: "none",
                borderRadius: "5px",
                backgroundColor: "#007bff",
                color: "white",
                cursor: "pointer",
              }}
              onClick={() => navigate(task.route)}
            >
              Go
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignTasks;
