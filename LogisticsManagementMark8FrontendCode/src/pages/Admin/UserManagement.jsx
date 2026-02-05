import React, { useState, useEffect } from "react";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: "", type: "" });
  const [showModal, setShowModal] = useState(false);

  // Fetch users from backend on mount
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("http://localhost:3000/user/users", {
          method: "GET",
        });
        const data = await res.json();

        if (data.success) {
          setUsers(data.users); // backend sends {success, count, users}
        } else {
          console.error("Error fetching users:", data.message);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Submit form → save user in backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/user/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();

      if (data.success) {
        setUsers([...users, data.user]); // append new user
        setNewUser({ username: "", type: "" });
        setShowModal(false);
      } else {
        alert(data.message || "Failed to add user");
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h3>User Management</h3>
      <button
        className="btn btn-primary my-2"
        onClick={() => setShowModal(true)}
      >
        Add User
      </button>

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Username</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={user._id || idx}>
              <td>{user.username}</td>
              <td>{user.type}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="modal show fade d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New User</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      value={newUser.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Type</label>
                    <select
                      className="form-select"
                      name="type"
                      value={newUser.type}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Warehouse manager">
                        Warehouse Manager
                      </option>
                      <option value="Delivery staff">Delivery Staff</option>
                    </select>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-success">
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagement;
