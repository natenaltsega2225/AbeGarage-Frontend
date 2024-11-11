import React from "react";
import banner1 from "../../../assets/images/banner/banner.jpg";
const TopBanner = () => {
  return (
    <section className="video-section">
      <div
        data-parallax='{"y": 50}'
        className="sec-bg"
        style={{ backgroundImage: `url(${banner1})`, objectFit: "contain" }}
      ></div>
      <div className="auto-container">
        <h5>Working since 1992</h5>
        <h2>
          Tuneup Your Car <br /> to Next Level
        </h2>
        <div className="video-box">
          <div className="video-btn">
            <a
              href="https://youtu.be/PUkAIAIzA0I?si=ugtpBZ2RHYXcn037"
              className="overlay-link lightbox-image video-fancybox ripple"
              target="_blank"
            >
              <i className="flaticon-play"></i>
            </a>
          </div>
          <div className="text">
            Watch intro video <br /> about us
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopBanner;
