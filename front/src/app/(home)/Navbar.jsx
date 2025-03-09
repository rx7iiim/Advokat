"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { FaBars, FaXmark } from "react-icons/fa6";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1600) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ دالة التنقل السلس إلى القسم المطلوب
  const scrollToSection = (id) => {

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false); // إغلاق القائمة بعد النقر (في الموبايل)
    }
  };

  const navItem = [
    { link: "About", path: "about" },
    { link: "Pricing", path: "pricing" },
    { link: "Testimonials", path: "testimonials" },
    { link: "Contact us", path: "contactus" },
  ];
  

  return (
    <nav  className="bg-white md:px-14 p-4 max-w-screen-2xl mx-auto py-4 border-b border-gray-300 text-xl shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* ✅ Logo Section */}
        <a href="/" className="flex items-center text-2xl font-semibold text-primary">
          <Image src={logo} alt="Logo" width={80} height={80} className="w-auto h-16" />
        </a>

        {/* ✅ Desktop Navigation Links */}
        <ul className="hidden md:flex items-center space-x-14" style={{ position: 'absolute', left: '373px', top: '34px' }}>
          {navItem.map(({ link, path }) => (
            <li key={path}>
              <button
                onClick={() => scrollToSection(path)}
                className="hover:text-gray-500 hover:border-b-2 hover:border-blue-600 transition duration-200 pb-1"
              >
                {link}
              </button>
            </li>
          ))}
        </ul>

        {/* ✅ Desktop Buttons */}
        <div className="hidden md:flex gap-3">
          <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-3xl">
            Sign Up
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-3xl hover:text-white hover:bg-indigo-600">
            Sign In
          </button>
        </div>

        {/* ✅ Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-blue-600 text-2xl">
            {isMenuOpen ? <FaXmark className="w-6 text-primary" /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* ✅ Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white absolute top-16 left-0 w-full text-2xl shadow-lg">
          <ul className="flex flex-col text-2xl items-center space-y-4 py-4">
            {navItem.map(({ link, path }) => (
              <li key={path}>
                <button
                  onClick={() => scrollToSection(path)}
                  className="block text-2xl text-gray-800 hover:text-blue-600 transition"
                >
                  {link}
                </button>
              </li>
            ))}
            {/* ✅ Mobile Buttons */}
            <div className="flex flex-col gap-3 w-full items-center mt-4">
            <Link href="/signup" onClick={() => setTimeout(() => setIsMenuOpen(false), 100)}>
  <span className="px-6 py-2 text-blue-600 border border-blue-600 rounded-3xl w-32">
    Sign Up
  </span>
</Link>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-3xl w-32 hover:text-white hover:bg-indigo-600">
                Sign In
              </button>
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
