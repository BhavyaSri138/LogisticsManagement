import React, { useState } from 'react';
import { Save, MapPin, X } from 'lucide-react';

const AddressUpdateForm = ({ currentAddress, onSave, onCancel }) => {
  const [address, setAddress] = useState({
    street: currentAddress?.street || '',
    city: currentAddress?.city || '',
    state: currentAddress?.state || '',
    zipCode: currentAddress?.zipCode || '',
    country: currentAddress?.country || 'United States'
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!address.street.trim()) newErrors.street = 'Street address is required';
    if (!address.city.trim()) newErrors.city = 'City is required';
    if (!address.state.trim()) newErrors.state = 'State is required';
    if (!address.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!/^\d{5}(-\d{4})?$/.test(address.zipCode)) {
      newErrors.zipCode = 'Please enter a valid ZIP code';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      onSave && onSave(address);
      setIsSaving(false);
    }, 1000);
  };

  const handleChange = (field, value) => {
    setAddress(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="card shadow-sm p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-2">
          <MapPin className="text-primary" size={24} />
          <h3 className="h5 mb-0">Update Delivery Address</h3>
        </div>
        {onCancel && (
          <button
            onClick={onCancel}
            className="btn btn-sm btn-light"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        {/* Street */}
        <div className="mb-3">
          <label className="form-label">Street Address *</label>
          <input
            type="text"
            value={address.street}
            onChange={(e) => handleChange('street', e.target.value)}
            className={`form-control ${errors.street ? 'is-invalid' : ''}`}
            placeholder="123 Main Street"
          />
          {errors.street && <div className="invalid-feedback">{errors.street}</div>}
        </div>

        {/* City & State */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">City *</label>
            <input
              type="text"
              value={address.city}
              onChange={(e) => handleChange('city', e.target.value)}
              className={`form-control ${errors.city ? 'is-invalid' : ''}`}
              placeholder="New York"
            />
            {errors.city && <div className="invalid-feedback">{errors.city}</div>}
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">State *</label>
            <select
              value={address.state}
              onChange={(e) => handleChange('state', e.target.value)}
              className={`form-select ${errors.state ? 'is-invalid' : ''}`}
            >
              <option value="">Select State</option>
              <option value="CA">California</option>
              <option value="NY">New York</option>
              <option value="TX">Texas</option>
              <option value="FL">Florida</option>
              <option value="IL">Illinois</option>
            </select>
            {errors.state && <div className="invalid-feedback">{errors.state}</div>}
          </div>
        </div>

        {/* Zip & Country */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">ZIP Code *</label>
            <input
              type="text"
              value={address.zipCode}
              onChange={(e) => handleChange('zipCode', e.target.value)}
              className={`form-control ${errors.zipCode ? 'is-invalid' : ''}`}
              placeholder="10001"
            />
            {errors.zipCode && <div className="invalid-feedback">{errors.zipCode}</div>}
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Country</label>
            <select
              value={address.country}
              onChange={(e) => handleChange('country', e.target.value)}
              className="form-select"
            >
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="Mexico">Mexico</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="d-flex gap-2 pt-3">
          <button
            type="submit"
            disabled={isSaving}
            className={`btn ${isSaving ? 'btn-secondary disabled' : 'btn-primary'}`}
          >
            {isSaving ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Saving...
              </>
            ) : (
              <>
                <Save size={16} className="me-2" />
                Save Address
              </>
            )}
          </button>
          
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-outline-secondary"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddressUpdateForm;