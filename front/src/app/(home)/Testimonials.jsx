
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import Kenza from "../../../public/Avatarsat.png";
import Sofia from "../../../public/sofia.png";
import Michel from "../../../public/michel.png";

const testimonials = [
  {
    id: 1,
    name: "Michael Knight",
    role: "Independent Lawyer",
    text: "Storing and retrieving case files has never been easier. The secure document feature keeps everything accessible.",
    rating: 4.9,
    image: Michel,
  },
  {
    id: 2,
    name: "Kenza L.",
    role: "L&B Law Firm",
    text: "As a law firm, we struggled with scattered documents and inefficient workflows. This system has streamlined our processes.",
    rating: 3.9,
    image: Kenza,
  },
  {
    id: 3,
    name: "Sofia T.",
    role: "Independent Lawyer",
    text: "This platform has completely transformed the way I manage my cases. Everything is organized, and I never miss a deadline!",
    rating: 2,
    image: Sofia,
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleCardClick = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };
  

  return (
    <div id = "testimonials" className="relative w-full max-w-5xl mx-auto px-4 py-10 overflow-visible">
      <h1 className="text-4xl font-bold text-center mb-14">Satisfied Clients</h1>

      <div className="relative flex items-center justify-center">
       
        <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-between gap-6">
          {testimonials.map((testimonial, index) => {
            const isActive = index === activeIndex;

            return (
              <motion.div
                key={testimonial.id}
                className={`relative rounded-2xl shadow-lg p-6 w-80 transition-all duration-300 flex flex-col items-center border border-gray-300 bg-boxColor2 text-left 
                  ${isActive ? "scale-125 z-50 opacity-100" : "scale-100 opacity-50"}
                  hover:scale-110 hover:opacity-100 hover:z-40 cursor-pointer`}
                onClick={() => handleCardClick(index)}
              >
         
                <div className="w-[160px] h-[38px] flex items-center gap-2 mb-3 rounded-3xl border-2 bg-white border-white p-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-yellow-400 ${i < Math.round(testimonial.rating) ? "" : "opacity-20"}`}>&#9733;</span>
                  ))}
                  <span className="text-gray-700 text-sm font-semibold">{testimonial.rating}</span>
                </div>

               
                <p className="text-gray-700 text-sm leading-relaxed text-center">"{testimonial.text}"</p>

            
              <div className="flex items-start gap-4 w-full justify-start">

  <div className="flex-shrink-0">
    <Image
      src={testimonial.image}
      alt={testimonial.name}
      width={50}
      height={50}
      className="rounded-full border-2 border-gray-300 shadow-md object-cover mt-4"
      priority
    />
  </div>

  <div className="flex flex-col font-bold text-left items-start">
    <h3 className="font-semibold text-gray-900 text-sm mt-5">{testimonial.name}</h3>
    <p className="text-xs text-gray-500">{testimonial.role}</p>
  </div>
</div>



              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;