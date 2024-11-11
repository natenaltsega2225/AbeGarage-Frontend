import React from "react";
import mechanic from "../../../assets/images/resource/image-4 (2).jpg";

const WhyChooseUs = () => {
  return (
    <section className="why-choose-us">
      <div className="auto-container">
        <div className="row">
          <div className="col-lg-6">
            <div className="sec-title style-two">
              <h2>Why Choose Us</h2>
              <div className="text">
                Bring to the table win-win survival strategies to ensure
                proactive domination. At the end of the day, going forward, a
                new normal that has evolved from generation heading towards.
              </div>
            </div>
            <div className="icon-box">
              <div className="icon">
                <span className="flaticon-mechanic"></span>
              </div>
              <h4>Certified Expert Mechanics</h4>
            </div>
            <div className="icon-box">
              <div className="icon">
                <span className="flaticon-wrench"></span>
              </div>
              <h4>Fast And Quality Service</h4>
            </div>
            <div className="icon-box">
              <div className="icon">
                <span className="flaticon-price-tag-1"></span>
              </div>
              <h4>Best Prices in Town</h4>
            </div>
            <div className="icon-box">
              <div className="icon">
                <span className="flaticon-trophy"></span>
              </div>
              <h4>Awarded Workshop</h4>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="sec-title style-two">
              <h2>Additional Services</h2>
            </div>
            <div className="row">
              <div className="col-md-5">
                <div className="image">
                  <img src={mechanic} alt="mechanic" />
                </div>
              </div>
              <div className="col-md-7">
                <ul className="list">
                  <li>General Auto Repair & Maintenance</li>
                  <li>Transmission Repair & Replacement</li>
                  <li>Tire Repair and Replacement</li>
                  <li>State Emissions Inspection</li>
                  <li>Brake Job / Brake Services</li>
                  <li>Electrical Diagnostics</li>
                  <li>Fuel System Repairs</li>
                  <li>Starting and Charging Repair</li>
                  <li>Steering and Suspension Work</li>
                  <li>Emission Repair Facility</li>
                  <li>Wheel Alignment</li>
                  <li>Computer Diagnostic Testing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
