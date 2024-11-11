import React from "react";
import b3 from "../../../assets/images/banner/banner3_darker_twice.jpg";
function TopBannerService() {
  return (
    <div>
      <section className="page-title" style={{ backgroundImage: `url(${b3})` }}>
        <div className="auto-container">
          <h2>Our Services</h2>
          <ul className="page-breadcrumb">
            <li>
              <a href="index.html">home</a>
            </li>
            <li>Our Services</li>
          </ul>
        </div>
        <h1 data-parallax='{"x": 200}'>Car Repairing</h1>
      </section>
    </div>
  );
}

export default TopBannerService;
