'use client'
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Calendar2 from "../../../components/calander/Calendar2";
import Button from "../../../components/button";
import { FaUser } from "react-icons/fa";
import Sidebar from "../../../components/sidebar/Sidebar";
import DayCalendar from "../../../components/calander/calendardate";

interface PageProps{
  params :Promise <{username:string}>
}
interface agendaProps {
  params: { username: string }; // params is an object, not a Promise
}

async function AgendaPage({ params }:PageProps) {
  const {username} =await params
  const [view, setView] = useState<"month" | "day">("month");
  const [date, setDate] = useState(new Date());
  const router = useRouter();
  const [user, setUser] = useState<string | null>(null);


  useEffect(() => {
    fetch("http://localhost:5008/auth/session", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated || !data.username) {
          router.push("/login");
        } else {
          setUser(data.username);
        }
      })
      .catch((error) => {
        console.error("Error fetching session:", error);
        router.push("/login");
      });
  }, [router]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800 p-2">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 pl-3 pt-2 ml-60">
        {/* Calendar */}
        <div className="mt-0 bg-white p-5 rounded-lg shadow-md fle">
          <div className="text-white flex items-center justify-center mb-6">
            <button
              className={`px-6 py-2 rounded-md text-lg font-semibold transition-all relative  text-gray-700 hover:text-blue-500 ${
                view === "month" ? "text-blue-500 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] after:bg-blue-500" : ""
              }`}
              onClick={() => setView("month")}
            >
              Months
            </button>
            <button
              className={`px-6 py-2 rounded-md text-lg font-semibold transition-all 
                          text-gray-700 hover:text-blue-500 
                          ${view === "day" ? "text-blue-500 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] after:bg-blue-500" : ""}`}
              onClick={() => setView("day")}
            >
              Days
            </button>

            <button className=" absolute  right-16 px-2 py-3 rounded-md text-lg font-semibold transition-all bg-[linear-gradient(135deg,#0048ff,#00d4ff)] text-white p-3">
              <div className="flex items-center justify-center">
                add event <img src="/plus-circle.png" alt="add event" className="w-6 h-6 ml-2" />
              </div>
            </button>
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

export default AgendaPage;