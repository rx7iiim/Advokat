"use client";
import React, { useEffect, useRef, useState } from "react";
import Barchart from "../../../components/Barchart/barchart";
import Sidebar from "@/app/components/sidebar/Sidebar";
import Tinybarchart from "../../../components/Tinybarchart/tinybarchart";
import { useRouter } from "next/navigation";
import * as dotenv from "dotenv";
dotenv.config();

const Dashboard = () => {
  const [user, setUser] = useState<any | null>(null);
  const router = useRouter();

  const [username, setUsername] = useState<string | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const didRunRef = useRef(false);

  useEffect(() => {
    if (didRunRef.current) return;
    didRunRef.current = true;
    fetch(`${API_URL}/auth/session`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated || !data.username) {
          router.push("/login");
        } else {
          console.log(data);
          setUser(data.user);
          setUsername(data.username);
        }
      })
      .catch((error) => {
        console.error("Error fetching session:", error);
        router.push("/login");
      });
  }, [router, API_URL]);

  const total = 50;
  const used = 30;
  const percentage = (used / total) * 100;
  const needleAngle = (percentage * 180) / 100 - 90;

  const datamok = [
    {
      pfp2: "/Group1.svg",
      fullName: "abderrahim",
      client_id: "1",
      pfp: "/Avatarsat.png",
    },
    {
      fullName: "abderrahim",
      client_id: "3",
      pfp: "/Avatarsat.png",
    },
    {
      fullName: "abderrahim",
      client_id: "2",
      pfp: "/Avatarsat.png",
    },
  ];
  const images = ["/Group1.svg", "/Group2.svg", "/Group3.svg"];

  const deleteclient = (clientId: string) => {
    console.log("Delete client with ID:", clientId);
    // Implement delete logic here
  };

  if (!username)
    return (
      <div className="w-full h-full flex justify-center items-center h-18">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
    if (user.role !== "Firm Manager") return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You do not have access to this page. Please contact the administrator if you believe this is an error.
        </p>
        <button
          onClick={() => window.history.back()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-row overflow-hidden min-h-screen text-gray-800 p-2 bg-gray-100 text-gray-800">
      <Sidebar user={user} />
      <div className="invisible w-[21%] h-[100vh]" aria-hidden="true"></div>
      <div className="flex-1 p-2 overflow-y-auto">
        <div className="bg-white shadow-md rounded-xl flex flex-col justify-start gap-[10px] p-4">
          <main className="flex">
            <div className="p-5 w-[70%]">
              <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

              <section className="mb-12">
                <Barchart />
              </section>

              <div className="flex gap-4 justify-center w-full mb-4">
                {datamok.map((client, index) => (
                  <div
                    key={client.client_id}
                    className="relative w-[25%] px-2 border border-transparent bg-white shadow-[1px_2px_10px_rgba(0,0,0,0.20)] rounded-lg flex flex-col justify-center text-center items-center text-white"
                  >
                    <div className="absolute top-0 right-0 inline-flex divide-x divide-gray-400 overflow-hidden rounded shadow-sm m-2">
                      <button
                        type="button"
                        className="px-1 py-1.5 bg-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-500 hover:text-gray-900 focus:relative"
                        aria-label="edit"
                      >
                        <img
                          src="/edit-svgrepo-com.svg"
                          alt="edit client"
                          className="size-2"
                        />
                      </button>

                      <button
                        className="px-1 py-1.5 bg-gray-300 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-500 hover:text-gray-900 focus:relative"
                        aria-label="delete"
                        onClick={() => deleteclient(client.client_id)}
                      >
                        <img
                          src="/delete-svgrepo-com.svg"
                          alt="delete client"
                          className="size-2"
                        />
                      </button>
                    </div>

                    <div>
                      <img
                        src={client.pfp}
                        alt="Client Image"
                        width={100}
                        height={100}
                        className="scale-75 rounded-full"
                      />
                    </div>

                    <h5 className="my-2 text-xl font-bold tracking-tight text-gray-900 font-mona">
                      {client.fullName}
                    </h5>
                    <div className="absolute top-2 left-2 ">
                      <img
                        src={images[index] || "/default.svg"} 
                        alt={`Group${index + 1}`}
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                    <ul className="mt-5  text-gray-700">
                    <li className="flex justify-around">
                      <span className="mr-2 text-lg text-gray-800">Casses won </span>
                      <span className="ml-2  text-lg text-gray-500">10</span>
                    </li>
                    <li className="flex justify-around ">
                      <span className="mr-2 text-lg text-gray-800">Casses lost </span>
                      <span className="ml-2  text-lg text-gray-500">0</span>
                    </li>
                  </ul>

                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white shadow-lg p-4 flex flex-col w-[30%]">
              <div className="font-bold text-xl mb-4 mt-4">
                <span> General Analytic </span>
              </div>

              <section className="flex flex-col gap-6">
                <div className="bg-white p-4 flex flex-col items-center rounded-2xl shadow-[1px_2px_10px_rgba(0,0,0,0.20)]">
                  <Tinybarchart />
                </div>

                <div className="bg-white p-4 rounded-2xl shadow-[1px_2px_10px_rgba(0,0,0,0.30)] flex flex-col items-center">
                  <div className="shadow-[1px_2px_10px_rgba(0,0,0,0.20)] pt-2 py-4 rounded-xl flex flex-col justify-center items-center">
                    <p className="mb-3 text-gray-600 text-sm text-center">
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
                          <linearGradient
                            id="usageGradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
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
                    <span className="text-sm text-gray-600">
                      Storage used {used} GB
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-2xl shadow-[1px_2px_10px_rgba(0,0,0,0.20)] flex flex-col justify-between">
                  <h3 className="text-lg font-semibold mb-2">Upgrade Plan</h3>
                  <p className="mb-4 text-sm">
                    Upgrade your plan to get extra storage and manage more cases
                    with ease and efficiency.
                  </p>
                  <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-100">
                    Upgrade Now
                  </button>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;