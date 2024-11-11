import React from "react";
import { useAuth } from "../../../Contexts/AuthContext"; // Adjust the path based on your file structure
import TopBannerHome from "../../Components/Banner/TopBannerHome";
import About24 from "../../Components/About24/About24";
import ServicesSec from "../../Components/ServiceSec/ServicesSec";
import FeaturesSec from "../../Components/FeaturesSec/FeturesSec";
import WhyChooseUs from "../../Components/WhyChoosUs/WhyChooseUs";
import BottomBanner from "../../Components/Banner/BottomBanner";
import CtaSec from "../../Components/CtaSec/CtaSec";
import Layout from "../../Pages/Layout/Layout";

const Home = () => {
  const { isLoggedIn, login } = useAuth() || {}; // Safe destructuring to avoid errors if undefined
  // Handle case where useAuth might not be available or is still loading
  if (isLoggedIn === undefined) {
    return <div>Loading...</div>;
  }
  return (
    <Layout>
      <div className="page-wrapper">
        {/* Conditional Greeting based on authentication */}
        <div>
          <h1>{isLoggedIn ? "Welcome back!" : "Please log in"}</h1>
          {!isLoggedIn && (
            <button onClick={() => login("some-auth-token")}>Login</button>
          )}
        </div>

        {/* Main Sections */}
        <TopBannerHome />
        <About24 />
        <ServicesSec />
        <FeaturesSec />
        <WhyChooseUs />
        <BottomBanner />
        <CtaSec />
      </div>
    </Layout>
  );
};

export default Home;
