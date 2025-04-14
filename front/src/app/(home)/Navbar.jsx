"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { FaBars, FaXmark } from "react-icons/fa6";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navbarRef = useRef(null);

  // Handle scroll and resize events
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Smooth scroll to a section with an offset to account for the navbar
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    const navbarHeight = navbarRef.current?.offsetHeight || 0;

    if (element) {
      // Scroll to the element with smooth behavior and offset to prevent it being hidden behind the navbar
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Adjust scroll position to account for the navbar height
      window.scrollBy(0, -navbarHeight);

      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { link: "About", path: "about" },
    { link: "Pricing", path: "pricing" },
    { link: "Testimonials", path: "testimonials" },
    { link: "Contact us", path: "contactus" },
  ];

  return (
    <nav 
      ref={navbarRef}
      className={`sticky top-0 w-full bg-transparent border-b border-gray-300 z-50 transition-all duration-300 ${
        isScrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image 
              src={logo} 
              alt="Logo" 
              width={80}
              height={80}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-6">
              {navItems.map(({ link, path }) => (
                <li key={path}>
                  <button
                    onClick={() => scrollToSection(path)}
                    className="px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors relative group"
                  >
                    {link}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex items-center space-x-4 ml-8">
              <Link href="/signup" className="px-6 py-2 text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition-colors">
                Sign Up
              </Link>
              <Link href="/login" className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                Sign In
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-blue-600"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaXmark className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute w-full bg-white shadow-lg">
            <ul className="px-4 py-6 space-y-4">
              {navItems.map(({ link, path }) => (
                <li key={path}>
                  <button
                    onClick={() => scrollToSection(path)}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
              <li className="pt-4 border-t border-gray-200">
                <div className="flex flex-col space-y-4">
                  <Link href="/signup" className="px-6 py-2 text-center text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50">
                    Sign Up
                  </Link>
                  <Link href="/login" className="px-6 py-2 text-center bg-blue-600 text-white rounded-full hover:bg-blue-700">
                    Sign In
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;