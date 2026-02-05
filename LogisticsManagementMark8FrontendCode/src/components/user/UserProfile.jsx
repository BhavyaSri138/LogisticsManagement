import React, { useState } from "react";
import { User, Mail, Phone, MapPin, Edit2, Save, X } from "lucide-react";

const UserProfile = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      onUpdate && onUpdate(editedUser);
      setIsEditing(false);
      setIsSaving(false);
    }, 1000);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setEditedUser((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="card shadow-sm p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="h5 mb-0">Profile Information</h3>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-outline-primary btn-sm d-flex align-items-center"
          >
            <Edit2 size={16} className="me-2" />
            Edit
          </button>
        ) : (
          <div className="d-flex gap-2">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`btn btn-sm d-flex align-items-center ${
                isSaving ? "btn-secondary disabled" : "btn-success"
              }`}
            >
              {isSaving ? (
                <>
                  <div
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} className="me-2" />
                  Save
                </>
              )}
            </button>
            <button
              onClick={handleCancel}
              className="btn btn-sm btn-light d-flex align-items-center"
            >
              <X size={16} className="me-2" />
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Avatar Section */}
      <div className="d-flex align-items-center mb-4">
        <div className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center me-3"
          style={{ width: "80px", height: "80px" }}
        >
          <User size={40} className="text-primary" />
        </div>
        <div>
          <h4 className="h6 mb-1">{editedUser.name}</h4>
          <small className="text-muted">
            Customer since {editedUser.memberSince}
          </small>
        </div>
      </div>

      {/* Profile Fields */}
      <div className="row g-4">
        {/* Left column */}
        <div className="col-md-6">
          {/* Full Name */}
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            {isEditing ? (
              <input
                type="text"
                value={editedUser.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="form-control"
              />
            ) : (
              <div className="d-flex align-items-center">
                <User size={16} className="text-muted me-2" />
                <span>{user.name}</span>
              </div>
            )}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            {isEditing ? (
              <input
                type="email"
                value={editedUser.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="form-control"
              />
            ) : (
              <div className="d-flex align-items-center">
                <Mail size={16} className="text-muted me-2" />
                <span>{user.email}</span>
              </div>
            )}
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            {isEditing ? (
              <input
                type="tel"
                value={editedUser.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="form-control"
              />
            ) : (
              <div className="d-flex align-items-center">
                <Phone size={16} className="text-muted me-2" />
                <span>{user.phone}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="col-md-6">
          {/* Address */}
          <div className="mb-3">
            <label className="form-label">Default Address</label>
            {isEditing ? (
              <textarea
                value={editedUser.address}
                onChange={(e) => handleChange("address", e.target.value)}
                rows={4}
                className="form-control"
              />
            ) : (
              <div className="d-flex align-items-start">
                <MapPin size={16} className="text-muted me-2 mt-1" />
                <span>{user.address}</span>
              </div>
            )}
          </div>

          {/* Account Statistics */}
          <div className="card bg-light p-3">
            <h6 className="mb-3">Account Statistics</h6>
            <div className="d-flex justify-content-between small mb-1">
              <span>Total Shipments:</span>
              <span className="fw-semibold">
                {user.stats?.totalShipments || 0}
              </span>
            </div>
            <div className="d-flex justify-content-between small mb-1">
              <span>Active Shipments:</span>
              <span className="fw-semibold">
                {user.stats?.activeShipments || 0}
              </span>
            </div>
            <div className="d-flex justify-content-between small">
              <span>Total Spent:</span>
              <span className="fw-semibold">
                ${user.stats?.totalSpent || 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;