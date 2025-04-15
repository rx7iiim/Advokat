"use client";

import React from "react";
import Barchart from "../../../components/Barchart/barchart";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Tinybarchart from "../../../components/Tinybarchart/tinybarchart";

const Dashboard = () => {
  const total = 50;
  const used = 30;
  const percentage = (used / total) * 100;
  const needleAngle = (percentage * 180) / 100 - 90;
  return (
    <div className="flex min-h-screen">

      <aside className="w-64 bg-white shadow-lg p-5 flex flex-col justify-between">
        <Sidebar />
      </aside>

      <main className="flex-1">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <section className="mb-12">

          <Barchart />
        </section>

        <aside className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-4 flex flex-col ">
          <div className='font-bold text-xl mb-4 mt-4'>
            <span> General Analytic </span>
          </div>
  <section className="flex flex-col gap-6">
 
    <div className="bg-white p-4 flex flex-col items-center rounded-2xl shadow-md">
      <Tinybarchart />
    </div>

    <div className="bg-white p-4 rounded-2xl shadow-md flex flex-col items-center">
      <p className="mb-3 text-gray-600 text-center">
        You have used {used} GB of the available {total} GB
      </p>
      <div className="relative w-40 h-24 mb-3">
        <svg className="w-full h-full" viewBox="0 0 200 100">
     
          <path
            d="M 10 100 A 90 90 0 0 1 190 100"
            stroke="#e5e7eb"
            strokeWidth="12"
            fill="none"
          />

          
          <defs>
            <linearGradient id="usageGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0000FF" /> 
              <stop offset="50%" stopColor="#0000FF" />
              <stop offset="100%" stopColor="#0000FF" /> 
            </linearGradient>
          </defs>
          <path
            d="M 10 100 A 90 90 0 0 1 190 100"
            stroke="url(#usageGradient)"
            strokeWidth="12"
            fill="none"
            strokeDasharray="283"
            strokeDashoffset={283 - (283 * percentage) / 100}
            strokeLinecap="round"
          />

       
          {[...Array(11)].map((_, i) => {
            const angle = (i * 18 - 90) * (Math.PI / 180);
            const x1 = 100 + Math.cos(angle) * 80;
            const y1 = 100 + Math.sin(angle) * 80;
            const x2 = 100 + Math.cos(angle) * 90;
            const y2 = 100 + Math.sin(angle) * 90;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#9ca3af"
                strokeWidth="2"
              />
            );
          })}


          <g transform={`rotate(${needleAngle} 100 100)`}>
            <line
              x1="100"
              y1="100"
              x2="100"
              y2="20"
              stroke="#4f46e5"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </g>

      
          <circle cx="100" cy="100" r="6" fill="#4f46e5" />
        </svg>

  
        <div className="absolute inset-0 flex items-end justify-center text-lg font-semibold text-indigo-600 pb-1">
          {used} GB
        </div>
      </div>
      <span className="text-sm text-gray-600">Storage used {used} GB</span>
    </div>


    <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-2xl shadow-md flex flex-col justify-between">
      <h3 className="text-lg font-semibold mb-2">Upgrade Plan</h3>
      <p className="mb-4 text-sm">
        Upgrade your plan to get extra storage and manage more cases with ease and efficiency.
      </p>
      <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-100">
        Upgrade Now
      </button>
    </div>
  </section>
</aside>

      </main>
    </div>
  );
};

export default Dashboard;

