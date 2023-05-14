import React from "react";
import HomeTop from "../components/HomeTop";
import HomeCenter from "../components/HomeCenter";
import HomeBottom from "../components/HomeBottom";

// La Home page
const Home = () => {
  return (
    <div className="homepage">
      <HomeTop />
      <HomeCenter />
      <HomeBottom />
    </div>
  );
};

export default Home;
