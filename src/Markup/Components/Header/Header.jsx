import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Header.module.css";
import logo from "../../../assets/images/logo.png";
import Login from "../../Pages/Login/Login";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("MiskerAmesalu");
  const navigate = useNavigate(); // Corrected way to get the navigate function

  // Check if the user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
      setUsername(localStorage.getItem("username") || "User"); // Retrieve username from localStorage if available
    }
  }, []);

  const handleLogin = () => {
    // Simulating a login process (set authToken and username in localStorage)
    localStorage.setItem("authToken", "sample_token");
    localStorage.setItem("username", username); // Store the username in localStorage
    setIsLoggedIn(true);
    navigate("/"); // Correct way to navigate to home page
  };

  const handleLogout = () => {
    // Remove authToken and username from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    navigate("/login"); // Correct way to navigate to login page
  };

  return (
    <header className="main-header header-style-one">
      <div className="header-top">
        <div className="auto-container">
          <div className="inner-container">
            <div className="left-column">
              <div className="text">Enjoy the Beso while we fix your car</div>
              <div className="office-hour">
                Monday - Saturday 7:00AM - 6:00PM
              </div>
            </div>
            <div className="right-column">
              <div className="phone-number">
                Schedule Your Appointment Today : <strong>1800 456 7890</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="header-upper">
        <div className="auto-container">
          <div className="inner-container">
            <div className="logo-box">
              <div className="logo">
                <a href="/">
                  <img src={logo} alt="Logo" />
                </a>
              </div>
            </div>
            <div className="right-column">
              <div className="nav-outer">
                <div className="mobile-nav-toggler">
                  <img src="assets/images/icons/icon-bar.png" alt="Menu Icon" />
                </div>

                <nav className="main-menu navbar-expand-md navbar-light">
                  <div
                    className="collapse navbar-collapse show clearfix"
                    id="navbarSupportedContent"
                  >
                    <ul className="navigation">
                      <li className="dropdown">
                        <a href="/">Home</a>
                      </li>
                      <li className="dropdown">
                        <a href="/about">About Us</a>
                      </li>
                      <li className="dropdown">
                        <a href="/services">Services</a>
                      </li>
                      <li>
                        <a href="/contact">Contact Us</a>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>

              {/* Conditionally Render Login/Logout */}
              <div className="link-btn">
                {isLoggedIn ? (
                  <>
                    <span className="welcome-message">
                      Welcome, {username}!
                    </span>
                    <button
                      className="theme-btn btn-style-one"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    className="theme-btn btn-style-one"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky-header">
        <div className="header-upper">
          <div className="auto-container">
            <div className="inner-container">
              <div className="logo-box">
                <div className="logo">
                  <a href="/">
                    <img
                      src="assets/images/custom/logo.png"
                      alt="Sticky Logo"
                    />
                  </a>
                </div>
              </div>
              <div className="right-column">
                <div className="nav-outer">
                  <div className="mobile-nav-toggler">
                    <img
                      src="assets/images/icons/icon-bar.png"
                      alt="Menu Icon"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mobile-menu">
        <div className="menu-backdrop"></div>
        <div className="close-btn">
          <span className="icon flaticon-remove"></span>
        </div>

        <nav className="menu-box">
          <div className="nav-logo">
            <a href="index.html">
              <img src="assets/images/logo-two.png" alt="Logo" />
            </a>
          </div>
          <div className="menu-outer"></div>
        </nav>
      </div>

      <div className="nav-overlay">
        <div className="cursor"></div>
        <div className="cursor-follower"></div>
      </div>
    </header>
  );
};

export default Header;
