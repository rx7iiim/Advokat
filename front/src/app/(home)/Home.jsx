import React from "react";
import About from "./About";
import Pricing from "./Pricing";
import Testimonials from "./Testimonials";
import Contactus from "./Contactus";
import './home.css';

const Home = () => {
  return (
    <div className="md: px-12 max-w-screen-2xl mx-auto mt-28">
      <About />
      <Pricing />
      <Testimonials />
      <Contactus />
    </div>
  );
};

export default Home;
