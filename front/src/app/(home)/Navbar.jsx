"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import logo from "../../../public/logo.png"
import { FaBars, FaXmark } from "react-icons/fa6"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false)
    }
  }

  const navItem = [
    { link: "About", path: "about" },
    { link: "Pricing", path: "pricing" },
    { link: "Testimonials", path: "testimonials" },
    { link: "Contact us", path: "contactus" },
  ]

  return (
    <nav className="bg-white px-6 md:px-14 py-4 shadow-md fixed w-full top-0 z-50 border-b border-gray-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <a href="/" className="flex items-center text-lg font-semibold text-primary">
          <div className="relative w-16 h-16 md:w-20 md:h-20">
            <Image
              src={logo || "/placeholder.svg"}
              alt="Logo"
              fill
              sizes="(max-width: 768px) 64px, 80px"
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center text-sm md:space-x-8 lg:space-x-14">
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

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-4 text-sm">
          <Link href="/signup" className="px-5 py-1.5 text-blue-600 border border-blue-600 rounded-3xl">
            Sign Up
          </Link>
          <button className="px-5 py-1.5 bg-blue-600 text-white rounded-3xl hover:bg-indigo-600">Sign In</button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-blue-600 text-2xl"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <FaXmark className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 w-full text-base shadow-lg z-50">
          <ul className="flex flex-col items-center space-y-4 py-4">
            {navItem.map(({ link, path }) => (
              <li key={path} className="w-full text-center">
                <button
                  onClick={() => scrollToSection(path)}
                  className="block w-full py-2 text-gray-800 hover:text-blue-600 hover:bg-gray-50 transition"
                >
                  {link}
                </button>
              </li>
            ))}
            {/* Mobile Buttons */}
            <div className="flex flex-col gap-3 w-full items-center mt-4 px-6 text-sm">
              <Link
                href="/signup"
                className="px-6 py-1.5 text-blue-600 border border-blue-600 rounded-3xl w-full max-w-xs text-center"
              >
                Sign Up
              </Link>
              <Link
                href="/login"
                className="px-6 py-1.5 bg-blue-600 text-white rounded-3xl w-full max-w-xs text-center hover:bg-indigo-600"
              >
                Sign In
              </Link>
            </div>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar