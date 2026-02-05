import React, { useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";

const AdminSettings = () => {
  const [formData, setFormData] = useState({
    adminName: "",
    email: "",
    password: "",
    theme: "light",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Settings Saved Successfully ✅");
    console.log(formData);
  };

  return (
    <Card className="p-4 shadow-sm">
      <h3 className="mb-4">⚙️ Admin Settings</h3>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Admin Name</Form.Label>
              <Form.Control
                type="text"
                name="adminName"
                value={formData.adminName}
                onChange={handleChange}
                placeholder="Enter Admin Name"
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter New Password"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Theme</Form.Label>
          <Form.Select name="theme" value={formData.theme} onChange={handleChange}>
            <option value="light">🌞 Light Mode</option>
            <option value="dark">🌙 Dark Mode</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Save Settings
        </Button>
      </Form>
    </Card>
  );
};

export default AdminSettings;
