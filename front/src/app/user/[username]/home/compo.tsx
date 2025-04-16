'use client'
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from '../../../components/Sidebar/Sidebar';
import Calendar from '../../../components/calander/Calendar';
import TaskList from './TaskList';
import Task from "./taskInterface";
import * as dotenv from 'dotenv';
dotenv.config();


type Props = {
  usernamee: string;
};

function HomePage(props: Props) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async  function loadpage () {
    await fetch(`${API_URL}/auth/session`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated || !data.username) {
          router.push("/login");
        } else {
          setUsername(data.username);
       
      }})
      .catch((error) => {
        console.error("Error fetching session:", error);
        router.push("/login");
      });
  };
  loadpage();

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/task?username=${username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [username, API_URL]);

  //if (!username || isLoading) return <p>Loading...</p>;

  return (
    <div className="flex flex-row overflow-hidden min-h-screen bg-gray-100 text-gray-800 p-2">
      {/* Sidebar */}
      <Sidebar />
      <div className="invisible-spacer w-[260px] h-[100vh]" aria-hidden="true"></div>

      {/* Main content */}
      <main className="flex-1 p-2 overflow-y-auto">
        <div className="bg-white shadow-md rounded-xl p-2 grid grid-cols-1 mt-0 mb-3">
          <h1 className="text-2xl ml-10 font-semibold">Good Morning, {username}</h1>
          <p className="text-gray-500 text-xs mb-3 ml-10 text-lg">What do you plan to do today?</p>
        </div>
        {/* Content Sections */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 bg-white">
          <div className="bg-white"></div>
          <div className="bg-white"></div>
          {/* Right Section (Calendar & Tasks) */}
          <div className="col-span-2 bg-white shadow-md rounded-xl pt-1 pr-3 overflow-hidden bg-gray-200 h-screen flex flex-col items-center">
            {/* ✅ Centered Calendar with Fixed Size */}
            <div className="w-[350px] flex justify-center">
              <Calendar />
            </div>

            <h2 className="text-xl font-semibold mb-2 ml-7 self-start">Tasks</h2>
            {/* ✅ Wider Scrollable Task List */}
            <div className="h-[500px] w-[90%] max-w-[600px] overflow-y-auto p-4 bg-white rounded-lg shadow-md">
              <TaskList tasks={tasks} setTasks={setTasks} username={props.usernamee} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;