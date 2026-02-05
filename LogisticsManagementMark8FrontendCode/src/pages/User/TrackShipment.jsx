import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TrackShipment = () => {
  const { id } = useParams(); // Mongo _id from URL
  const navigate = useNavigate();

  const [trackingId, setTrackingId] = useState(id || "");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchShipment = async (mongoId) => {
    if (!mongoId) return;

    setLoading(true);
    setResult(null);

    try {
      // ✅ Use mongo _id directly
      const res = await fetch(`http://localhost:3000/orders/order/#${mongoId}`);
      if (!res.ok) throw new Error("Shipment not found");
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: "❌ Shipment not found" });
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch if id comes from URL
  useEffect(() => {
    if (trackingId) fetchShipment(trackingId);
  }, [trackingId]);

  const handleTrack = () => {
    if (!trackingId) {
      setResult({ error: "⚠️ Please enter a Tracking ID" });
      return;
    }

    // ✅ Update URL with Mongo _id
    navigate(`/user/track-shipment/${trackingId}`);
    fetchShipment(trackingId);
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">🔍 Track Shipment</h2>

      <div className="card p-4 shadow-sm mb-4">
        <label className="form-label">Enter OrderId</label>
        <div className="d-flex gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Enter MongoDB _id"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
          />
          <button
            className="btn btn-primary"
            onClick={handleTrack}
            disabled={loading}
          >
            {loading ? "Tracking..." : "Track"}
          </button>
        </div>
      </div>

      {result && (
        <div className="card p-4 shadow-sm">
          {result.error ? (
            <p className="text-danger fw-semibold">{result.error}</p>
          ) : (
            <>
              <h5 className="fw-bold mb-3">Shipment Details</h5>
              <p><strong>Status:</strong> {result.status}</p>
              <p><strong>Destination:</strong> {result.deliveryAddress?.address || "N/A"}</p>
              <p>
                <strong>Expected Delivery:</strong>{" "}
                {result.expectedDeliveryDate
                  ? new Date(result.expectedDeliveryDate).toDateString()
                  : "N/A"}
              </p>
              <p><strong>Driver:</strong> {result.assignDriver?.name || "Not Assigned"}</p>
              <p><strong>Product:</strong> {result.product?.productName || "N/A"}</p>
              <p><strong>Quantity:</strong> {result.quantity}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TrackShipment;
