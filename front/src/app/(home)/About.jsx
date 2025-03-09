import React from "react";
import Image from "next/image";
import about from "../../../public/about.png";
import { FaUsers, FaCalendarAlt, FaTasks, FaDatabase } from "react-icons/fa6";
import Fausers from "../../../public/Clients.png" ;
import Facalendaralt from "../../../public/agenda.png" ; 
import fatasks from "../../../public/tasks.png" ; 
import fadatabase from "../../../public/archives.png" ;

const About = () => {
  return (
    <section className="py-6 bg-white">
      <div id="about" className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        
        {/* ✅ القسم النصي (جهة اليسار) مع مسافة من اليسار */}
        <div className="md:w-1/2 text-left w-[605px] h-[422px] relative ml-24">
          <h2 className="text-6xl font-bold text-gray-800 leading-tight">
            <span className="block">Manage Your</span>
            <div className="flex gap-4">
            <span className="block bg-gradient-to-r from-blue-700 to-cyan-300 text-transparent bg-clip-text">
              Legal Work
            </span> 
            <span className="block text-black">with</span>
            </div>
           <div className="flex gap-4">
           <span className="block text-black">Ease with</span>
            <span className="block bg-gradient-to-r from-cyan-300 to-blue-700 text-transparent bg-clip-text">
              Advokat
            </span>
           </div>
          </h2>
          <p className="mt-4 text-gray-600">
            <span className="block">An the all-in-one case management system designed for</span>
             <span className="block">lawyers and law firms. Manage your cases, clients, and tasks</span> 
             <span className="block">efficiently-so you can focus on winning.</span>
          </p>
          <button className="mt-6 px-6 py-3 text-white font-semibold bg-customGray rounded-3xl shadow-lg hover:bg-blue-600 transition-colors">
  Get Started
</button>
 
        </div>

        {/* ✅ القسم الخاص بالصورة (جهة اليمين) مع مسافة من اليمين */}
        <div className="md:w-1/2 flex justify-end mt-6 md:mt-0 mr-24">
          <div className="w-[564px] h-[597px] relative">
            <Image 
              src={about} 
              alt="About Us" 
              layout="fill" 
              objectFit="cover" 
              className="rounded-lg"
            />
          </div>
        </div>

      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-0 max-w-screen-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-12  ">
          {/* 🟦 Clients & Cases */}
          <div className="bg-white shadow-lg rounded-xl p-6 flex items-start gap-8 border w-full md:w-[500px] h-[240px] mx-auto hover:border-b-2 hover:border-blue-600 transition duration-200 pb-1">
            <Image src={Fausers} alt="client" width={120} height={120}  className="text-blue-600 text-3xl" />
            <div className="gap-6 ">
              <h3 className="text-3xl font-bold text-gray-900 mb-6 "style={{ wordSpacing: "9px" }}>Clients & Cases</h3>
              <p className="mt-8 text-1xl text-gray-600 items-center  "style={{ wordSpacing: "9px" }}>
                Maintain  a  structured database with client details, case histories, and ongoing progress, allowing for quick access and better case management.
              </p>
            </div>
          </div>

          {/* 🟦 Agenda */}
          <div className="bg-white shadow-lg rounded-xl p-6 flex items-start gap-8 border w-full md:w-[524px] h-[240px] mx-auto hover:border-b-2 hover:border-blue-600 transition duration-200 pb-1">
          <Image src={Facalendaralt} alt="agenda" width={100} height={100}  className="text-blue-600 text-3xl" />
            <div>
              <h3 className="text-3xl font-bold text-gray-900"style={{ wordSpacing: "8px" }}>Agenda</h3>
              <p className="mt-8 text-1xl text-gray-600"style={{ wordSpacing: "8px" }}>
                Stay organized with a smart calendar that tracks deadlines, court dates, and important meetings while sending automated reminders to keep you on schedule.
              </p>
            </div>
          </div>

          {/* 🟦 Tasks */}
          <div className="bg-white shadow-lg rounded-xl p-6 flex items-start gap-8 border w-full md:w-[524px] h-[240px] mx-auto hover:border-b-2 hover:border-blue-600 transition duration-200 pb-1">
          <Image src={fatasks} alt="taskes" width={99} height={99}  className="text-blue-600 text-3xl" />
            <div>
              <h3 className="text-3xl font-bold text-gray-900"style={{ wordSpacing: "8px" }}>Tasks</h3>
              <p className=" mt-8 text-1xl text-gray-600 "style={{ wordSpacing: "8px" }}>
                Assign, track, and manage legal tasks efficiently, ensuring seamless collaboration and timely case progress.
              </p>
            </div>
          </div>

          {/* 🟦 Storage */}
          <div className="bg-white shadow-lg rounded-xl p-6 flex items-start gap-8 border w-full md:w-[524px] h-[240px] mx-auto hover:border-b-2 hover:border-blue-600 transition duration-200 pb-1">
          <Image src={fadatabase} alt="storag" width={100} height={1000}  className="text-blue-600 text-3xl" />
            <div>
              <h3 className="text-3xl font-bold text-gray-900"style={{ wordSpacing: "8px" }}>Storage</h3>
              <p className=" mt-8 text-1xl text-gray-600 "style={{ wordSpacing: "8px" }}>
                Upload, store, and manage legal documents while keeping an organized archive of past case files.
              </p>
            </div>
          </div>
        </div>
      </div>

    </section>
    
  );
};

export default About;