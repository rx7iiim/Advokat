"use client";

import React from 'react';
import Barchart from '../../../components/Barchart/barchart';
import Sidebar from '../../../components/Sidebar/Sidebar';
import Tinybarchart from '../../../components/Tinybarchart/tinybarchart';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">

      <aside className="w-64 bg-white shadow-lg p-5 flex flex-col justify-between">
        <Sidebar />
      </aside>

      <main className="flex-1">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <section className="mb-12">
          <div className="ml-28 items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Won/Lost Cases</h2>
            <span className="text-gray-500">Cases from Jan–Dec, 2024</span>
          </div>
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

    {/* العنصر الثاني */}
    <div className="bg-white p-4 rounded-2xl shadow-md flex flex-col items-center">
      <p className="mb-3 text-gray-600 text-center">
        You have used 30 GB of the available 50 GB
      </p>
      <div className="relative w-24 h-24 mb-2">
        <svg className="w-full h-full">
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke="#4f46e5"
            strokeWidth="8"
            strokeDasharray="283"
            strokeDashoffset="113"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-indigo-600">
          30 GB
        </div>
      </div>
      <span className="text-sm text-gray-600">Storage used 30GB</span>
    </div>

    {/* العنصر الثالث */}
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
