// import React from "react";
// import Footer from "./Footer";
// import careerImg from "../../assets/Careers.jpg";

// const jobOpenings = [
//   {
//     title: "Front-End Developer",
//     location: "Bangalore, India",
//     type: "Full-time",
//     description: "Looking for a passionate Front-End Developer skilled in React.js.",
//   },
//   {
//     title: "Backend Developer",
//     location: "Remote",
//     type: "Full-time",
//     description: "Responsible for building and maintaining APIs and databases.",
//   },
//   {
//     title: "Marketing Executive",
//     location: "Delhi, India",
//     type: "Part-time",
//     description: "Manage campaigns and social media presence.",
//   },
// ];

// function Careers() {
//   return (
//     <div className="bg-light">
//       {/* Hero Section with Image */}
//       <div className="container py-5 text-center">
//         <h2 className="mb-4">Join Our Team</h2>
//         <img
//           src={careerImg}
//           alt="Careers at Atech Logistics"
//           className="img-fluid rounded shadow-sm mb-5"
//           style={{ maxHeight: "350px", objectFit: "cover" }}
//         />
//       </div>

//       {/* Job Openings */}
//       <div className="container pb-5">
//         <h3 className="text-center mb-5">Current Openings</h3>
//         <div className="row g-4">
//           {jobOpenings.map((job, index) => (
//             <div className="col-12 col-sm-6 col-md-4" key={index}>
//               <div className="card h-100 shadow-sm">
//                 <div className="card-body d-flex flex-column">
//                   <h5 className="card-title">{job.title}</h5>
//                   <p className="text-muted mb-1">{job.location}</p>
//                   <p className="text-muted mb-3">{job.type}</p>
//                   <p className="card-text flex-grow-1">{job.description}</p>
//                   <button className="btn btn-primary mt-auto">Apply Now</button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default Careers;

import React from "react";
import { useNavigate } from "react-router-dom";  // ✅ Import hook
import Footer from "./Footer";
import careerImg from "../../assets/Careers.jpg";

const jobOpenings = [
  {
    title: "Front-End Developer",
    location: "Bangalore, India",
    type: "Full-time",
    description: "Looking for a passionate Front-End Developer skilled in React.js.",
  },
  {
    title: "Backend Developer",
    location: "Remote",
    type: "Full-time",
    description: "Responsible for building and maintaining APIs and databases.",
  },
  {
    title: "Marketing Executive",
    location: "Delhi, India",
    type: "Part-time",
    description: "Manage campaigns and social media presence.",
  },
];

function Careers() {
  const navigate = useNavigate();

  const handleApply = (title) => {
    // Redirect to /apply/JobTitle
    navigate(`/apply/${encodeURIComponent(title)}`);
  };

  return (
    <div className="bg-light">
      {/* Hero Section with Image */}
      <div className="container py-5 text-center">
        <h2 className="mb-4">Join Our Team</h2>
        <img
          src={careerImg}
          alt="Careers at Atech Logistics"
          className="img-fluid rounded shadow-sm mb-5"
          style={{ maxHeight: "350px", objectFit: "cover" }}
        />
      </div>

      {/* Job Openings */}
      <div className="container pb-5">
        <h3 className="text-center mb-5">Current Openings</h3>
        <div className="row g-4">
          {jobOpenings.map((job, index) => (
            <div className="col-12 col-sm-6 col-md-4" key={index}>
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{job.title}</h5>
                  <p className="text-muted mb-1">{job.location}</p>
                  <p className="text-muted mb-3">{job.type}</p>
                  <p className="card-text flex-grow-1">{job.description}</p>
                  <button
                    className="btn btn-primary mt-auto"
                    onClick={() => handleApply(job.title)}  // ✅ Navigate
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Careers;

