import React from "react";
import Footer from "./Footer";
function TrainingTutorials() {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Training & Tutorials</h2>
      <p className="text-muted text-center mb-5">
        Learn how to use our platform effectively with detailed guides and
        training sessions.
      </p>

      <div className="card shadow-sm p-4">
        <h5>Resources</h5>
        <ul>
          <li>Step-by-step video tutorials</li>
          <li>PDF guides for all modules</li>
          <li>On-demand team training sessions</li>
        </ul>
      </div>
        <Footer />
    </div>
  );
}

export default TrainingTutorials;
