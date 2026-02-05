import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const roles = [
  { name: 'Admin', icon: '🧑‍💼' },
  { name: 'Warehouse Manager', icon: '🏢' },
  { name: 'Delivery Staff', icon: '🚚' },
];

function AuthServices() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    employment: ''
  });

  const navigate = useNavigate();

  const handleLoginClick = (role) => {
    setFormData((prev) => ({
      ...prev,
      employment: role,
    }));
    setSelectedRole(role);
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    };

    if (isRegistering) {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      alert(
        `Registering ${formData.name} as ${selectedRole} with email: ${formData.email}`
      );

      try {
        const fetching = await fetch('http://localhost:3000/register', body);
        const response = await fetching.json();
        console.log(response);
      } catch (error) {
        console.error("Registration error:", error);
      }

    } else {
      alert(
        `Logging in as ${selectedRole} with email: ${formData.email}`
      );

      try {
        const fetching = await fetch('http://localhost:3000/login', body);
        const response = await fetching.json();
        console.log(response);

        if (fetching.status === 201) {
          if (selectedRole === 'Admin') navigate('/admin-dashboard');
          if (selectedRole === 'Warehouse Manager') navigate('/warehouse-dashboard');
          if (selectedRole === 'Delivery Staff') navigate('/delivery-dashboard');
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
      <h1 className="my-4 text-center">Logistics Management System</h1>

      {!selectedRole ? (
        <div className="d-flex flex-wrap justify-content-center gap-3">
          {roles.map((role) => (
            <div className="card shadow-sm text-center" style={{ width: '18rem' }} key={role.name}>
              <div className="card-body">
                <div className="fs-1 my-3">{role.icon}</div>
                <h5 className="card-title">{role.name}</h5>
                <button
                  className="btn btn-primary mt-2"
                  onClick={() => handleLoginClick(role.name)}
                >
                  Login as {role.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card shadow p-4" style={{ width: '25rem' }}>
          <h2 className="text-center mb-4">{isRegistering ? 'Register' : 'Login'} as {selectedRole}</h2>
          <form onSubmit={handleSubmit}>
            {isRegistering && (
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
            )}
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            {isRegistering && (
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
            )}
            <button type="submit" className="btn btn-success w-100 mb-2">
              {isRegistering ? 'Register' : 'Login'}
            </button>
            <button
              type="button"
              className="btn btn-link w-100"
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering ? 'Already have an account? Login' : 'New user? Register'}
            </button>
            <button
              type="button"
              className="btn btn-secondary w-100 mt-3"
              onClick={() => {
                setSelectedRole(null);
                setIsRegistering(false);
              }}
            >
              Back
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AuthServices;