"use client";

import Sidebar from '@/app/components/Sidebar/Sidebar';
import React from 'react';
import { FaPhone, FaEnvelope, FaMobileAlt } from 'react-icons/fa';
import { FiEdit2 } from 'react-icons/fi';
import Image from 'next/image';

import lawyer1 from '../../../../../public/lawyer1.png';
import lawyer2 from '../../../../../public/lawyer2.png';
import lawyer3 from '../../../../../public/unsplash__5_CBVCLBsY.png';

const lawyers = [
  { id: 1, name: 'Ryan Louis', image: lawyer1, phone: '+62-21-6385 3435', mobile: '+62-21-6385 3435', email: 'info@prohukum.com' },
  { id: 2, name: 'Anzai Ano', image: lawyer2, phone: '+62-21-6385 3435', mobile: '+62-21-6385 3435', email: 'info@prohukum.com' },
  { id: 3, name: 'Bianca Karim', image: lawyer3, phone: '+62-21-6385 3435', mobile: '+62-21-6385 3435', email: 'info@prohukum.com' },
  { id: 4, name: 'Ryan Louis', image: lawyer1, phone: '+62-21-6385 3435', mobile: '+62-21-6385 3435', email: 'info@prohukum.com' },
  { id: 5, name: 'Anzai Ano', image: lawyer2, phone: '+62-21-6385 3435', mobile: '+62-21-6385 3435', email: 'info@prohukum.com' },
  { id: 6, name: 'Bianca Karim', image: lawyer3, phone: '+62-21-6385 3435', mobile: '+62-21-6385 3435', email: 'info@prohukum.com' },
  { id: 8, name: 'Ryan Louis', image: lawyer1, phone: '+62-21-6385 3435', mobile: '+62-21-6385 3435', email: 'info@prohukum.com' },
  { id: 7, name: 'Anzai Ano', image: lawyer2, phone: '+62-21-6385 3435', mobile: '+62-21-6385 3435', email: 'info@prohukum.com' },
];

const Page = () => {
  return (
<div className="flex min-h-screen bg-gray-100">

   <aside className="w-64 max-h-full bg-white flex flex-col justify-between">
        <Sidebar />
      </aside>

<main className="ml-10 mr-10 flex-1 p-6 min-h-screen">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 space-y-4 md:space-y-0">
          <h1 className="text-2xl font-semibold  ">Lawyers</h1>
          <div className="flex items-center space-x-2">
            <select className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none">
              <option>Any</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
            <div className="relative">
              <input
                type="text"
                placeholder="Search Clients name"
                className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none"
              />
              <button className="absolute right-1 top-1 text-blue-800 bg-blue-700">
                🔍
              </button>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {lawyers.map((lawyer) => (
            <div
              key={lawyer.id}
              className="bg-white p-4 rounded shadow-sm relative hover:shadow-lg transition duration-300"
            >
              {/* Edit Icon */}
              <FiEdit2 className="absolute top-3 right-3 text-gray-400 hover:text-blue-600 cursor-pointer" />
              <div className="flex flex-col items-center">
                <Image
                  src={lawyer.image}
                  alt={lawyer.name}
                  className="rounded-full mb-3 object-cover"
                  width={80}
                  height={80}
                />
                <h2 className="font-semibold">{lawyer.name}</h2>
                <div className="text-sm text-gray-500 mt-2 space-y-1 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <FaPhone className="text-gray-400" /> <span>{lawyer.phone}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <FaMobileAlt className="text-gray-400" /> <span>{lawyer.mobile}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <FaEnvelope className="text-gray-400" /> <span>{lawyer.email}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Page;
