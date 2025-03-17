'use client'
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from '../../../components/sidebar/Sidebar';
import Calendar from '../../../components/calander/Calendar';
import TaskList from './TaskList';
import Task from "./taskInterface";

interface PageProps {
  params: {
    username: string;
  };
}

export default function Homepage({ params }:PageProps) {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch("http://localhost:5008/auth/session", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated || !data.username) {
          router.push("/login"); 
        } else {
          setUsername(data.username);
        }
      })
      .catch((error) => {
        console.error("Error fetching session:", error);
        router.push("/login");
      });
  }, [router]);
  
  if (!username) return <p>Loading...</p>;

   

 
  /*useEffect(() => {
    fetch("http://localhost:5008/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data)) 
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);
*/






  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800 p-2">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 p-2 ml-60">
        <div className="bg-white shadow-md rounded-xl p-2  grid grid-cols-1  mt-0 mb-3 ">
          <h1 className="text-2xl ml-10 font-semibold">Good Morning, ${params.username}</h1>
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
