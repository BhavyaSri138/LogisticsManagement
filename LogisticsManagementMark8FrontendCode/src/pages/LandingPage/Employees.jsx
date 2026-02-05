import React from "react";
import "../../styles/Common/Employees.css";
import Footer from "./Footer";
import EmpImage from "../../assets/Employees.jpg";

function Employees() {
  // Dummy employee data
  const employees = [
    { id: 1, name: "John Doe", role: "Driver" },
    { id: 2, name: "Jane Smith", role: "Dispatcher" },
    { id: 3, name: "Michael Brown", role: "Logistics Manager" },
  ];

  return (
    <div className="employee-page"> 
      <h1>Employees page</h1>
      <div className="image-container">
      <img src={EmpImage} alt="Employees at atech Logistics" className="employee-image"/>
      </div>
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Footer/>
    </div>
  
  );
}

export default Employees;