import React from 'react'
import Layout from "../Layout/Layout";
import { Link } from "react-router-dom";
import ServicesSec from '../../Components/ServiceSec/ServicesSec';
import WhyChooseUs from '../../Components/WhyChoosUs/WhyChooseUs';
import classes from "./Services.module.css";
import BottomBanner from '../../Components/Banner/BottomBanner';
// import PhoneIcon from "@mui/icons-material/Phone";
function Services() {
  return (
    <Layout>
      <div className={classes.contactus}>
        <h1 style={{ paddingLeft: "0px" }}>Our Services</h1>
        <Link className={classes.home} to="/">
          Home
        </Link>
        {"  "}
        <span style={{ color: "white" }}>&gt;</span>
        {"  "}
        <Link style={{ color: "white" }} to="/services">
          Services
        </Link>
      </div>
      <ServicesSec />
      <WhyChooseUs />
      <BottomBanner />
      <div className={classes.appointmentcontainer}>
        <div className={classes.appointmentBox}>
          <div className={classes.appointment}>
            <h5 style={{ color: "white" }}>Schedule Your Appointment Today</h5>
            <p>Your Automotive Repair & Maintenance Service Specialist</p>
          </div>
          <div className={classes.number}>
            <h4 style={{ color: "white" }}>1800.456.7890</h4>
          </div>
          <div className={classes.contactInfo}>
            <button>
              <a
                href="tel:18004567890"
                style={{ color: "black", textDecoration: "none" }}
              >
                CALL US: 1-800-456-7890
              </a>
              <i className="fa fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default Services