import React from 'react';
import { Package, Calendar, MapPin, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserShipmentCard = ({ shipment, onClick }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'text-success bg-light';
      case 'in transit': return 'text-primary bg-light';
      case 'pending': return 'text-warning bg-light';
      case 'delayed': return 'text-danger bg-light';
      default: return 'text-secondary bg-light';
    }
  };

  const handleTrack = (e) => {
    e.stopPropagation(); // Prevent card onClick from firing
    navigate(`/user/track-shipment/${shipment.id}`);
  };

  return (
    <div
      className="card mb-3 shadow-sm border-1"
      style={{ cursor: onClick ? "pointer" : "default" }}
      onClick={() => onClick && onClick(shipment)}
    >
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className="d-flex align-items-center">
            <div className="p-2 bg-light rounded me-3">
              <Package size={24} className="text-primary" />
            </div>
            <div>
              <h5 className="mb-1">#{shipment.id}</h5>
              <p className="mb-0 text-muted">{shipment.description}</p>
            </div>
          </div>
          <span className={`badge rounded-pill ${getStatusColor(shipment.status)}`}>
            {shipment.status}
          </span>
        </div>

        <ul className="list-unstyled mb-3">
          <li className="d-flex align-items-center mb-2 text-muted">
            <Calendar size={16} className="me-2" />
            Shipped: {shipment.shippedDate}
          </li>
          <li className="d-flex align-items-center mb-2 text-muted">
            <MapPin size={16} className="me-2" />
            To: {shipment.destination}
          </li>
          <li className="d-flex align-items-center mb-2 text-muted">
            <Truck size={16} className="me-2" />
            Carrier: {shipment.carrier}
          </li>
        </ul>

        <div className="border-top pt-3 d-flex justify-content-between align-items-center">
          <span className="fw-medium">Expected: {shipment.expectedDate}</span>
          <span className="fw-bold text-primary">${shipment.value}</span>
        </div>

        {/* Track Order Button */}
        <div className="mt-3 text-end">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={handleTrack}
          >
            🚚 Track Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserShipmentCard;
