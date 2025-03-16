'use client'
import { useState } from "react";
import Calendar2 from "../components/calander/Calendar2";
import  Button  from "../components/button";
import { FaUser } from "react-icons/fa";
import Sidebar from "../components/Sidebar/Sidebar";
import DayCalendar from "../components/calander/calendardate";

export default function AgendaPage() {
  const [view, setView] = useState<"month" | "day">("month");
  const [date, setDate] = useState(new Date());

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="mt-3 bg-white rounded-lg h-screen"><Sidebar/></div>
      
      
      {/* Main Content */}
      <main className="flex-1 p-3">
       

        {/* Calendar */}
        <div className="mt-0 bg-white p-5 rounded-lg shadow-md fle">
        <div className="text-white flex items-center justify-center ">
        <button
          className={`px-6 py-2 rounded-md text-lg font-semibold transition-all relative  text-gray-700 hover:text-blue-500 ${
            view === "month" ? "text-blue-500 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] after:bg-blue-500" : ""}`}
          onClick={() => setView("month")}
        >
          Months
        </button>
        <button
  className={`px-6 py-2 rounded-md text-lg font-semibold transition-all relative 
              text-gray-700 hover:text-blue-500 
              ${view === "day" ? "text-blue-500 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] after:bg-blue-500" : ""}`}
  onClick={() => setView("day")}
>
  Days
</button>

        <button className=" absolute  right-16 px-1 py-2 rounded-md text-lg font-semibold transition-all bg-[linear-gradient(135deg,#0048ff,#00d4ff)] text-white p-3"><div className="flex items-center justify-center">add event <img src="/plus-circle.png" alt="add event"className="w-6 h-6 ml-2" /></div></button>
      </div>

      {/* Render Selected Calendar */}
      <div className="w-full max-w-4xl">
        {view === "month" ? <Calendar2 /> : <DayCalendar />}
      </div>
    </div>
       
      </main>
    </div>
  );
}
