import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Common components
import NavbarComponent from "./components/Common/NavbarComponent.jsx";
import HomePage from "./pages/LandingPage/HomePage.jsx";
import AboutUsPage from "./pages/LandingPage/AboutUsPage.jsx";
import Team from "./pages/LandingPage/Team.jsx"
import Careers from "./pages/LandingPage/Careers.jsx";
import Logistics from "./pages/LandingPage/Logistics.jsx";
import Consulting from "./pages/LandingPage/Consulting.jsx";
import Support from "./pages/LandingPage/Support.jsx";
import ApplyForm from "./pages/LandingPage/ApplyForm.jsx";
import CreateNewShipment from "./pages/User/CreateNewShipment.jsx";
import SupplyChainConsulting from "./pages/LandingPage/SupplyChainConsulting.jsx";
import ProcessOptimization from "./pages/LandingPage/ProcessOptimization.jsx";
import RiskManagement from "./pages/LandingPage/RiskManagement.jsx";
import CustomerSupport from "./pages/LandingPage/CustomerSupport";
import TechnicalAssistance from "./pages/LandingPage/TechnicalAssistance";
import TrainingTutorials from "./pages/LandingPage/TrainingTutorials";


// Auth Page
import LoginPage from "./pages/auth/LoginPage.jsx";

// Admin Pages
import AdminLayout from "./pages/Admin/AdminLayout.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import UserManagement from "./pages/Admin/UserManagement.jsx";
import Shipments from "./pages/Admin/Shipments.jsx";
import ShipmentDetails from "./pages/Admin/ShipmentDetails.jsx";
import AddShipment from "./pages/Admin/AddShipment.jsx";
import Warehouse from "./pages/Admin/Warehouse.jsx";
import AssignDriver from "./pages/Admin/AssignDriver.jsx";
import Reports from "./pages/Admin/Reports.jsx";
import AdminSettings from "./pages/Admin/AdminSettings.jsx";
import AssignTasks from "./pages/Admin/AssignTasks";
import AssignVehicle from "./pages/Admin/AssignVehicle.jsx";
import AssignManager from "./pages/Admin/AssignWarehouseManager.jsx";
import AssignRoute from "./pages/Admin/AssignRoute.jsx";

// Warehouse Manager Pages
import WarehouseDashboard from "./pages/WarehouseManager/WarehouseDashboard.jsx";
import Inventory from "./pages/WarehouseManager/Inventory.jsx";
import Orders from "./pages/WarehouseManager/Orders.jsx";


// Delivery Staff Pages
import DeliveryDashboard from "./pages/DeliveryStaff/DeliveryDashboard.jsx";
import AssignedShipments from "./pages/DeliveryStaff/AssignedShipments.jsx";
import UpdateShipmentStatus from "./pages/DeliveryStaff/UpdateShipmentStatus.jsx";
import DeliveryShipmentCard from "./pages/DeliveryStaff/DeliveryShipmentCard.jsx";
import DeliveryLayout from "./pages/DeliveryStaff/DeliveryLayout.jsx"; // Delivery Layout with sidebar

// User Pages
import UserDashboard from "./pages/User/UserDashboard.jsx";
import UserProfile from "./components/user/UserProfile.jsx";
import AddressUpdateForm from "./components/user/AddressUpdateForm.jsx";
import MyShipments from "./pages/User/MyShipments.jsx";
import TrackShipment from "./pages/User/TrackShipment.jsx"
import ShipmentHistory from "./pages/User/ShipmentHistory.jsx"
import ShipmentCard from "./pages/DeliveryStaff/DeliveryShipmentCard.jsx";


function App() {
  return (
    <Router>
      {/* Navbar visible on all pages */}
      <NavbarComponent />


      <Routes>
        {/* Landing page */}
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/team" element={<Team />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/apply/:jobTitle" element={<ApplyForm />} />
        <Route path="/logistics" element={<Logistics />} />
        <Route path="/consulting" element={<Consulting />} />
        <Route path="/consulting/supply-chain" element={<SupplyChainConsulting />} />
        <Route path="/consulting/process-optimization" element={<ProcessOptimization />} />
        <Route path="/consulting/risk-management" element={<RiskManagement />} />
        <Route path="/support" element={<Support />} />
        <Route path="/support/customer" element={<CustomerSupport />} />
        <Route path="/support/technical" element={<TechnicalAssistance />} />
        <Route path="/support/training" element={<TrainingTutorials />} />



        {/* Auth Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="shipments" element={<Shipments />} />
          <Route path="shipments/:id" element={<ShipmentDetails />} />
          <Route path="add-shipment" element={<AddShipment />} />
          <Route path="warehouse" element={<Warehouse />} />
          <Route path="assign-driver" element={<AssignDriver />} />
          <Route path="assign-vehicle" element={<AssignVehicle />} />
          <Route path="assign-manager" element={<AssignManager />} />
          <Route path="assign-route" element={<AssignRoute />} />
          <Route path="assign-tasks" element={<AssignTasks />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>


        {/* Warehouse Manager Routes */}
        <Route path="/warehouse-dashboard" element={<WarehouseDashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/orders" element={<Orders />} />

        <Route path="/assign-driver" element={<AssignDriver />} />

        {/* Delivery Staff Routes */}
        <Route path="/delivery" element={<DeliveryLayout />}>
          <Route index element={<DeliveryDashboard />} />
          <Route path="assigned" element={<AssignedShipments />} />
          <Route path="update" element={<UpdateShipmentStatus />} />

        </Route>

        {/* User Routes */}
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/address-update" element={<AddressUpdateForm />} />
        <Route path="/user/my-shipments" element={<MyShipments />} />
        <Route path="/user/create-shipment" element={<CreateNewShipment />} />
        <Route path="/user/shipment-history" element={<ShipmentHistory />} />
        <Route path="/user/track-shipment" element={<TrackShipment />} />
        <Route path="/user/track-shipment/:id" element={<TrackShipment />} />

        



        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>

    </Router>
  );
}

export default App;