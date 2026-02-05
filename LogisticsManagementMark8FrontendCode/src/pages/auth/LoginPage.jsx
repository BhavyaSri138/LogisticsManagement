import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import Footer from '../LandingPage/Footer';

const roles = [
  { name: 'Admin', icon: '🧑‍💼' },
  { name: 'Warehouse Manager', icon: '🏢' },
  { name: 'Delivery Staff', icon: '🚚' },
  { name: 'User', icon: '👤' },
];

function LoginPage() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '' // ✅ matches backend model
  });

  const navigate = useNavigate();

  const handleLoginClick = (role) => {
    setFormData((prev) => ({
      ...prev,
      role: role, // ✅ use role instead of employment
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

      try {
        const fetching = await fetch("http://localhost:3000/authentication/signup", body);
        const response = await fetching.json();
        console.log(response);
        if (fetching.status === 201) {
          alert("Registration successful!");
          redirectUser(selectedRole);
        } else {
          alert(response.message || "Registration failed");
        }
      } catch (error) {
        console.error("Registration error:", error);
      }
    } else {
      try {
        const fetching = await fetch("http://localhost:3000/authentication/login", body);
        const response = await fetching.json();
        console.log(response);

        if (fetching.status === 200) {
          redirectUser(selectedRole);
        } else {
          alert(response.message || "Login failed");
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    }
  };

  // ✅ Redirect helper
  const redirectUser = (role) => {
    if (!role) {
      console.error("No role found for redirect");
      return;
    }

    const normalizedRole = role.toLowerCase();

    if (normalizedRole === 'admin') navigate('/admin');
    else if (normalizedRole === 'warehouse manager') navigate('/warehouse-dashboard');
    else if (normalizedRole === 'delivery staff') navigate('/delivery');
    else if (normalizedRole === 'user') navigate('/user');
    else navigate('/'); // fallback
  };

  // ✅ Google login/signup handler
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      console.log("Google Token:", token);

      const decoded = jwtDecode(token);
      console.log("Decoded:", decoded);

      const endpoint = "http://localhost:3000/authentication/google";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          googleId: decoded.sub,
          email: decoded.email,
          name: decoded.name,
          picture: decoded.picture,
          role: selectedRole || 'User' // ✅ send role properly
        }),
      });

      const data = await res.json();
      console.log("Backend Response:", data);
      console.log("Redirecting user with role:", selectedRole);

      if (res.status === 200 || res.status === 201) {
        redirectUser(data.user?.role || selectedRole);
      } else {
        alert(data.message || "Google authentication failed");
      }
    } catch (err) {
      console.error("Google login error:", err);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4 fw-bold text-primary">🚀 Logistics Management System</h1>

      {!selectedRole ? (
        <div className="row justify-content-center">
          {roles.map((role) => (
            <div className="col-md-3 mb-4" key={role.name}>
              <div className="card shadow h-100 text-center border-0">
                <div className="card-body">
                  <div className="display-4">{role.icon}</div>
                  <h5 className="card-title mt-2">{role.name}</h5>
                  <button
                    className="btn btn-primary w-100 mt-3"
                    onClick={() => handleLoginClick(role.name)}
                  >
                    Login as {role.name}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow border-0">
              <div className="card-body p-4">
                <h3 className="text-center mb-4">
                  {isRegistering ? 'Register' : 'Login'} as <span className="text-primary">{selectedRole}</span>
                </h3>

                <form onSubmit={handleSubmit}>
                  {isRegistering && (
                    <div className="mb-3">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
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
                      name="email"
                      className="form-control"
                      placeholder="Email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
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
                        name="confirmPassword"
                        className="form-control"
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

                  <div className="text-center mb-2">OR</div>

                  {/* ✅ Google login button */}
                  <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => console.log("Google login failed")}
                  />

                  <button
                    type="button"
                    className="btn btn-outline-primary w-100 mb-2 mt-3"
                    onClick={() => setIsRegistering(!isRegistering)}
                  >
                    {isRegistering ? 'Already have an account? Login' : 'New user? Register'}
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100"
                    onClick={() => {
                      setSelectedRole(null);
                      setIsRegistering(false);
                    }}
                  >
                    Back
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default LoginPage;
