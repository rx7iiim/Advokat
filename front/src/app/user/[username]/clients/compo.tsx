"use client"
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Client from './clientInterface';
import Sidebar from '../../../components/sidebar/Sidebar';
import * as dotenv from 'dotenv';
dotenv.config();



function UserCards() {
 
  const router = useRouter();
  const [Client, setClient] = useState<Client[]>([]);
  const [username, setUsername] = useState<string | null>(null);
 const API_URL=process.env.API_URL
  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await fetch('https://your-backend-api.com/Client');
        if (!response.ok) {
          throw new Error('Failed to fetch Client');
        }
        const data = await response.json();
        setClient(data);
      } catch (error) {
        console.error('Error fetching Client:', error);
      }
    };

    fetchClient();
  }, []);

  const tryclient=[{name:"rahim",
    id:"5",
    description :"lord of winterfill and the king of the seven kingdoms",
    imageUrl:"https://avatars.githubusercontent.com/u/154564602?s=400&u=32aae8bc4ee89d0f09d3d1891d822c0c9e268332&v=4"
  },{name:"rahim",
    id:"5",
    description :"lord of winterfill and the king of the seven kingdoms",
    imageUrl:"https://avatars.githubusercontent.com/u/154564602?s=400&u=32aae8bc4ee89d0f09d3d1891d822c0c9e268332&v=4"
  },{name:"rahim",
    id:"5",
    description :"lord of winterfill and the king of the seven kingdoms",
    imageUrl:"https://avatars.githubusercontent.com/u/154564602?s=400&u=32aae8bc4ee89d0f09d3d1891d822c0c9e268332&v=4"
  },{name:"rahim",
    id:"5",
    description :"lord of winterfill and the king of the seven kingdoms",
    imageUrl:"https://avatars.githubusercontent.com/u/154564602?s=400&u=32aae8bc4ee89d0f09d3d1891d822c0c9e268332&v=4"
  },{name:"rahim",
    id:"5",
    description :"lord of winterfill and the king of the seven kingdoms",
    imageUrl:"https://avatars.githubusercontent.com/u/154564602?s=400&u=32aae8bc4ee89d0f09d3d1891d822c0c9e268332&v=4"
  }]

useEffect(() => {
    fetch(`${API_URL}/auth/session`, {
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



  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800 p-2">
          {/* Sidebar */}
          <Sidebar />
    <div className="container mx-auto p-4 ml-60">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tryclient.map((user) => (
          <div key={user.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm ">
            <a href="#">
              <img className="rounded-t-lg" src={user.imageUrl} alt={user.name} />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{user.name}</h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{user.description}</p>
              <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Read more
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>

  );
};

export default UserCards;