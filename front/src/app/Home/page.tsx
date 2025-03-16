'use client'
import React, { useState } from "react";
import Header from '../components/Upbar/Upbar';
import Sidebar from '../components/Sidebar/Sidebar';
import Calendar from '../components/calander/Calendar';
import TaskList from '../components/TaskList';
import UpgradePlanBanner from '../components/UpgradePlanBanner';

export default function Index() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Review new client case file', completed: false },
    { id: 2, title: 'Design post for Holi', completed: false },
    { id: 3, title: 'Brainstorming new project', completed: false },
    { id: 4, title: 'Re-Branding Discussion', completed: false },
    { id: 5, title: 'User Research', completed: false },
  ]);

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800 p-2">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 p-2">
        <div className="bg-white shadow-md rounded-xl p-2  grid grid-cols-1  mt-0 mb-3 ">
          <h1 className="text-2xl ml-10 font-semibold">Good Morning, John!</h1>
          <p className="text-gray-500 text-xs mb-3 ml-10 text-lg">What do you plan to do today?</p>
          </div>
          {/* Content Sections */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 bg-white">
           
            <div className="bg-white">
              
            </div>
            <div className="bg-white">
              
              </div>
            {/* Right Section (Calendar & Tasks) */}

            <div className="col-span-2 bg-white shadow-md rounded-xl pt-1 pr-3 overflow-hidden bg-gray-200 h-screen">
          <div className="  mx-auto w-max h-screen">
                <Calendar />
                <h2 className="text-xl font-semibold mb-2 ml-2">Tasks</h2>
                <TaskList tasks={tasks} setTasks={setTasks} />
          </div>
             
            </div>
          </div>
        
      </main>
      
    </div>
  );
}
