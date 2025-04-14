"use client"; // هذا مهم لأنه يجب تشغيل الكود على العميل

import React from "react";
import { useRouter } from "next/navigation"; // استخدم Next.js للتنقل
import Navbar from "./Navbar";
import About from "./About";
import Pricing from "./Pricing";
import Testimonials from "./Testimonials";
import ContactUs from "./Contactus";
import Link from "next/link";

function Page() {
  const router = useRouter(); // استخدم `useRouter` بدلاً من `createBrowserRouter`

  return (
    <div className="overflow-x-hidden">
    
      <Navbar />
      <About />
      <Pricing />
      <Testimonials />
      <ContactUs />

    </div>
  );
}

export default Page;



