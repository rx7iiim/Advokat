"use client";
import React from "react";
import Image from "next/image";
import about from "../../../public/about.png";
import Fausers from "../../../public/Clients.png";
import Facalendaralt from "../../../public/agenda.png"; 
import fatasks from "../../../public/tasks.png"; 
import fadatabase from "../../../public/archives.png";

const About = () => {
  return (
    <section className="py-6 md:py-12 bg-white">
      <div id="about" className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
        
        {/* Text Section - Made Responsive */}
        <div className="md:w-1/2 text-center md:text-left md:ml-6 lg:ml-12 xl:ml-24 mt-0 md:mt-0 order-2 md:order-1">
          <h2 className="text-6xl md:text-7xl lg:text-7xl font-bold text-gray-800 leading-tight">
            <span className="block">Manage Your</span>
            <div className="flex flex-wrap gap-2 md:gap-4 justify-center md:justify-start">
              <span className="bg-gradient-to-r from-blue-700 to-cyan-300 text-transparent bg-clip-text">
                Legal Work
              </span> 
              <span className="text-black">with</span>
            </div>
            <div className="flex flex-wrap gap-2 md:gap-4 justify-center md:justify-start">
              <span className="text-black">Ease</span>
              <span className="bg-gradient-to-r from-cyan-300 to-blue-700 text-transparent bg-clip-text">
                Advokat
              </span>
            </div>
          </h2>
          <p className="mt-4 md:mt-6 text-gray-600 text-base md:text-xl lg:text-xl max-w-2xl mx-auto md:mx-0">
            An all-in-one case management system designed for lawyers and law firms. 
            Manage your cases, clients, and tasks efficiently so you can focus on winning.
          </p>
          <button className="mt-6 md:mt-8 mb-8 md:mb-16 px-6 py-3 text-white font-semibold bg-customGray rounded-3xl shadow-lg hover:bg-blue-600 transition-colors w-full md:w-auto">
            Get Started
          </button>
        </div>

        {/* Image Section - Made Responsive */}
      <div className="md:w-1/2 flex justify-center md:justify-end  md:mt-0  md:mr-3 order-1 md:order-2">
       <div className="w-full max-w-md lg:max-w-xl aspect-square relative ">
       <div className="absolute inset-0">
      <div className="h-1/3 bg-blue-100 rounded-t-lg w-full" />
    </div>
            <Image 
              src={about} 
              alt="About Us" 
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="rounded-lg object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* Features Grid - Enhanced Responsiveness */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 xl:gap-12 mt-12">
          {[Fausers, Facalendaralt, fatasks, fadatabase].map((icon, index) => (
            <div key={index} className="bg-white shadow-lg rounded-xl p-4 md:p-6 flex flex-col md:flex-row items-start gap-4 md:gap-6 hover:border-blue-600 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 md:w-24 md:h-24 flex-shrink-0">
                <Image 
                  src={icon} 
                  alt="Feature icon"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 md:mb-4 tracking-wide">
                  {['Clients & Cases', 'Agenda', 'Tasks', 'Storage'][index]}
                </h3>
                <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed tracking-wide">
                  {[
                    'Maintain a structured database with client details, case histories, and ongoing progress for better case management.',
                    'Stay organized with a smart calendar tracking deadlines and court dates with automated reminders.',
                    'Assign, track, and manage legal tasks efficiently for seamless collaboration.',
                    'Upload, store, and manage legal documents with organized archive access.'
                  ][index]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;