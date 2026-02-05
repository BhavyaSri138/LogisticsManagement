import React from "react";
import { useParams } from "react-router-dom";

function ApplyForm() {
  const { jobTitle } = useParams();

  return (
    <div className="container py-5">
      <h2>Apply for {decodeURIComponent(jobTitle)}</h2>
      <form className="mt-4">
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input type="text" className="form-control" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Resume</label>
          <input type="file" className="form-control" accept=".pdf" required />
        </div>

        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    </div>
  );
}

export default ApplyForm;