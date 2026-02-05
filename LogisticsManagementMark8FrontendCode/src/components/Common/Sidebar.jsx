// import React from 'react';
// // import './Sidebar.css';

// const Sidebar = () => {
//   return (
//     <div className="sidebar">
//       <div className="sidebar-header">
//         <h3>Admin Panel</h3>
//       </div>
//       <ul className="sidebar-links">
//         <li><a href="/dashboard">Dashboard</a></li>
//         <li><a href="/shipments">Shipments</a></li>
//         <li><a href="/tracking">Tracking</a></li>
//         <li><a href="/reports">Reports</a></li>
//         <li><a href="/settings">Settings</a></li>
//         <li><a href="/logout">Logout</a></li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;

import React from 'react';
import "../../styles/Common/Sidebar.css"; // Correct external CSS path

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Admin Panel</h3>
      </div>
      <ul className="sidebar-links">
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/shipments">Shipments</a></li>
        <li><a href="/tracking">Tracking</a></li>
        <li><a href="/reports">Reports</a></li>
        {/* <li><a href="/settings">Settings</a></li> */}
        <li><a href="/logout">Logout</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;