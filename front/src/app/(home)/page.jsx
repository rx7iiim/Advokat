
import Navbar from "./Navbar";
import About from "./About";
import Pricing from "./Pricing";
import Testimonials from "./Testimonials";
import ContactUs from "./Contactus";
import Link from "next/link";

function Page() {

  return (
    <div>
    
      <Navbar />
      <About />
      <Pricing />
      <Testimonials />
      <ContactUs />

    </div>
  );
}

export default Page;



