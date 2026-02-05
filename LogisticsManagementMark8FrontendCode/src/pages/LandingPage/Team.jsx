import React from "react";
import Footer from "./Footer";

const teamMembers = [
  {
    name: "John Doe",
    role: "CEO",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Jane Smith",
    role: "CTO",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Mike Johnson",
    role: "Operations Manager",
    image: "https://randomuser.me/api/portraits/men/56.jpg",
  },
  {
    name: "Sara Williams",
    role: "Marketing Lead",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

function Team() {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-5">Our Team</h2>
      <div className="row g-4">
        {teamMembers.map((member, index) => (
          <div className="col-12 col-sm-6 col-md-3" key={index}>
            <div className="card h-100 shadow-sm text-center">
              <img
                src={member.image}  // Use member.image here
                className="card-img-top img-fluid"
                alt={member.name}
              />
              <div className="card-body">
                <h5 className="card-title">{member.name}</h5>
                <p className="card-text">{member.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Team;