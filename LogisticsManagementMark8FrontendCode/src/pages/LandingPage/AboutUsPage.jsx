import React from 'react';
import Footer from './Footer';
import '../../styles/Common/AboutUs.css';
import aboutUsImg from '../../assets/AboutUs.jpg'

function AboutUsPage() {
  return (
    <div className="bg-light">
      {/* Header Section */}
      <div className="container py-5">
        <h1 className="text-center mb-4">About Us</h1>

        {/* Image + Text Section */}
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src={aboutUsImg}
              alt="Logistics Management"
              className="img-fluid rounded shadow-sm"
            />
          </div>
          <div className="col-md-6">
            <p className="lead">
              Dedicated Logistics Solutions You Can Trust. Atech Logistics, Inc. is a third-party logistics (3PL) company that provides fully-customized dedicated transportation solutions for businesses all across the United States. 
            </p>
            <p>
              With multiple facilities located in the Western United States, Atech has earned a solid reputation of designing custom logistics solutions backed by the highest standards in customer service.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default AboutUsPage;