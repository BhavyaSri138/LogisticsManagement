import React, { useState } from "react";
import { Download, FileText, CheckCircle } from "lucide-react";

const InvoiceDownloadButton = ({ shipmentId, invoiceData }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);

    // Simulate download process
    setTimeout(() => {
      // In a real app, this would trigger actual file download
      const element = document.createElement("a");
      const file = new Blob([JSON.stringify(invoiceData, null, 2)], {
        type: "application/json",
      });
      element.href = URL.createObjectURL(file);
      element.download = `invoice-${shipmentId}.json`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      setIsDownloading(false);
      setIsDownloaded(true);

      // Reset downloaded state after 3 seconds
      setTimeout(() => setIsDownloaded(false), 3000);
    }, 1500);
  };

  return (
    <div className="mb-3">
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className={`btn w-100 d-flex align-items-center justify-content-center ${
          isDownloaded
            ? "btn-success"
            : isDownloading
            ? "btn-secondary disabled"
            : "btn-primary"
        }`}
      >
        {isDownloaded ? (
          <>
            <CheckCircle size={18} className="me-2" />
            <span>Downloaded Successfully</span>
          </>
        ) : isDownloading ? (
          <>
            <div
              className="spinner-border spinner-border-sm me-2"
              role="status"
            ></div>
            <span>Downloading...</span>
          </>
        ) : (
          <>
            <Download size={18} className="me-2" />
            <span>Download Invoice</span>
          </>
        )}
      </button>

      <div className="card mt-3">
        <div className="card-body d-flex">
          <FileText size={18} className="me-2 text-secondary" />
          <div>
            <h6 className="card-title mb-2">Invoice Details</h6>
            <p className="mb-1 small">Invoice ID: INV-{shipmentId}</p>
            <p className="mb-1 small">Amount: ${invoiceData?.amount || "0.00"}</p>
            <p className="mb-1 small">
              Date: {invoiceData?.date || new Date().toLocaleDateString()}
            </p>
            <p className="mb-0 small">Format: PDF</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDownloadButton;