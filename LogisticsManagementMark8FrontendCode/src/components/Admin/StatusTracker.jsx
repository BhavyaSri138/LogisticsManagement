import React from "react";

const StatusTracker = ({ status }) => {
  const steps = ["Pending", "In Transit", "Out for Delivery", "Delivered"];

  return (
    <div className="flex items-center gap-4 mt-2">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`px-3 py-1 rounded-full text-sm ${
            step === status
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {step}
        </div>
      ))}
    </div>
  );
};

export default StatusTracker;
