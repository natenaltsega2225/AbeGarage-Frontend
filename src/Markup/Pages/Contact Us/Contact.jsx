import React from "react";
import Layout from "../../Pages/Layout/Layout";
import classes from "./contact.module.css";
import "font-awesome/css/font-awesome.min.css";
import { Link } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

function Contact() {
  const apiKey = import.meta.env.VITE_MAPS_API_KEY; // Access the API key from env
  // const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=54B,+Tailstoi+Town,+5238+MT,+La+city,+IA+5224`;
  const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31523.80380701426!2d38.712689898073435!3d9.020316224195062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b860b3a4e6733%3A0x3ae74ad7c1cd9d1e!2sAbinet%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1711117652523!5m2!1sen!2set`
  return (
    <Layout>
      <div className={classes.contact}>
        <div className={classes.contactus}>
          <h1>Contact Us</h1>
          <Link className={classes.home} to="/">
            Home
          </Link>
          {"  "}
          <span>&gt;</span>
          {"  "}
          <Link style={{ color: "white" }} to="/contact">
            Contact Us
          </Link>
        </div>
        <div className={classes.location}>
          {/* Google Map */}
          <div className={classes.map}>
            <iframe
              title="Google Map Location"
              src={mapSrc} // Use the mapSrc variable
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

          {/* Address Details */}
          <div>
            <div>
              <h4>Our Address</h4>
              <p>
                Completely synergize resource taxing relationships via niche
                markets. Professionally cultivate one-to-one customer service.
              </p>
              <div />
              <div className={classes.icon}>
                <LocationOnIcon style={{ color: "red" }} />
                <div className={classes.address}>
                  <h5>Address:</h5>
                  <p>54B, Tailstoi Town 5238 MT, La city, IA 5224</p>
                </div>
              </div>
              <div className={classes.icon}>
                <EmailIcon style={{ color: "red" }} />
                <div className={classes.address}>
                  <h5>Email:</h5>
                  <p>contact@buildtruck.com</p>
                </div>
              </div>
              <div className={classes.icon}>
                <PhoneIcon style={{ color: "red" }} />
                <div className={classes.address}>
                  <h5>Phone:</h5>
                  <p>1800 456 7890 | 1254 897 3654</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.appointmentcontainer}>
          <div className={classes.appointmentBox}>
            <div className={classes.appointment}>
              <h5 style={{ color: "white" }}>
                Schedule Your Appointment Today
              </h5>
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
      </div>
    </Layout>
  );
}

export default Contact;
