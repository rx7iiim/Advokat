'use client'
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/sidebar/Sidebar";
import Calendar from '../../../components/calander/Calendar';
import TaskList from './TaskList';
import Task from "./taskInterface";
import Client from "../clients/clientInterface";
import * as dotenv from 'dotenv';
import { Button } from "@mui/material";
import Chat from "@/app/components/chat/Chat";
dotenv.config();


type Props = {
  usernamee: string;
};

function HomePage(props: Props) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const router = useRouter();
  const [user,setUser]=useState<any|null>(null)
  const [username, setUsername] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
   const [clients, setClients] = useState<Client[]>([]);
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
            console.log(data)
            setUser(data.user);
            setUsername(data.username);
          }
        })
        .catch((error) => {
          console.error("Error fetching session:", error);
          router.push("/login");
        });
    }, [router, API_URL]);
  
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


 const deleteclient = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/clients?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setClients(clients.filter((client) => client.client_id !== id));
      } else {
        console.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };




  const datamok=[{ fullName:"abderrahim",
    client_id:1,
    phoneNumber :"213558339334",
    pfp:"/Avatarsat.png",
    contactInfo:"213558339334",
    email:"a_zine@estin.dz"},{ fullName:"abderrahim",
      client_id:3,
      phoneNumber :"213558339334",
      pfp:"/Avatarsat.png",
      contactInfo:"213558339334",
      email:"a_zine@estin.dz"},{ fullName:"abderrahim",
        client_id:2,
        phoneNumber :"213558339334",
        pfp:"/Avatarsat.png",
        contactInfo:"213558339334",
        email:"a_zine@estin.dz"}]


        const filedata =[{  index:1
          ,name: "td analyse",
           status: "done",
          date: "50/12/2000",
          updated:"last day",
          clientName:"salim"},{  index:2
            ,name: "td analyse",
             status: "done",
            date: "50/12/2000",
            updated:"last day",
            clientName:"salim"},{  index:3
              ,name: "td analyse",
               status: "done",
              date: "50/12/2000",
              updated:"last day",
              clientName:"salim"}]



  

              if (!username)
                return (
                  <div className=" w-full h-full flex justify-center items-center h-18">
                    <span className="loading loading-spinner text-primary"></span>
                  </div>
                );

  return (
    <div className="flex flex-row overflow-hidden min-h-screen bg-gray-100 text-gray-800 p-2">
      {/* Sidebar */}
      <Sidebar user={user} />
      <div className="invisible w-[21%] h-[100vh]" aria-hidden="true"></div>

      {/* Main content */}
      <main className="flex-1 p-2 overflow-y-auto">
        <div className="bg-white shadow-md rounded-xl p-2 grid grid-cols-1 mt-0 mb-3">
          <h1 className="text-2xl ml-10 font-semibold">Good Morning, {username}</h1>
          <p className="text-gray-500 text-xs mb-3 ml-10 text-lg">What do you plan to do today?</p>
        </div>
        {/* Content Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 bg-white rounded-xl">
          <div className="bg-white col-span-2 justify-center flex flex-col items-center text-start overflow-hidden rounded-xl">
          <h1 className="text-xl ml-10 font-semibold mt-3 mb-6 mr-auto">Recently viewed files</h1>
          
          <table className="rounded-xl">
               <tbody className="bg-white divide-y divide-gray-200 shadow-[1px_2px_10px_rgba(0,0,0,0.20)]" >
                  {filedata.map((file, index) => (
                    <tr key={index}>
                      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <div className="inline-flex items-center gap-x-3">
                        
                          <div className="flex items-center gap-x-2">
                            <div className="flex items-center justify-center w-8 h-8 text-blue-600 bg-blue-100 rounded-full">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                              </svg>
                            </div>
                            <div>
                              <h2 className="font-normal text-gray-800">{file.name}</h2>
                              <p className="text-xs font-normal text-gray-500">{file.status}</p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">{file.status}</td>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{file.date}</td>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{file.updated}</td>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{file.clientName}</td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <Button className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg bg-gray-100">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                          </svg>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
            </table>
      <h1 className="text-xl ml-10 font-semibold mb-6 mt-6 mr-auto">Recently viewed clients</h1>

                    <div className="flex gap-4 justify-center w-full mb-4">
          {datamok.map((client) => (
  <div
    key={client.client_id}
    className="relative  w-[25%]  px-2 border border-transparent bg-white shadow-[1px_2px_10px_rgba(0,0,0,0.20)] rounded-lg flex flex-col justify-center text-center items-center  text-white"
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
          className="size-2 color-white"
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
          className="size-2 color-white"
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

    <div className="flex flex-col justify-around h-2/5 w-full">
      <div className="flex flex-row justify-center gap-[15px] w-full">
        <img
          src="/phone-svgrepo-com.svg"
          alt="phone"
          width={20}
          height={18}
          className="my-2"
        />
        <div className="w-3/4 overflow-hidden">
          <p className="font-mona my-1 w-5/6 text-gray-900 text-xs dark:text-gray-400">
            {client.phoneNumber}
          </p>
        </div>
      </div>

      <div className="flex flex-row justify-center gap-[15px] w-full">
        <img
          src="/contact-book-svgrepo-com.svg"
          alt="contact info"
          width={20}
          height={18}
          className="mr-1 my-1"
        />
        <div className="w-3/4 overflow-hidden my-1">
          <p className="font-mona w-5/6 text-gray-900 text-xs dark:text-gray-400 my-1">
            {client.contactInfo}
          </p>
        </div>
      </div>

      <div className="flex flex-row justify-center gap-[15px] w-full my-1">
        <img
          src="/email-1572-svgrepo-com.svg"
          alt="email"
          width={18}
          height={18}
          className="mb-2 mr-1"
        />
        <div className="w-3/4 overflow-hidden">
          <p className="mb-2 font-mona w-5/6 text-gray-900 text-xs dark:text-gray-400 my-1">
            {client.email}
          </p>
        </div>
      </div>
    </div>
  </div>
                    ))}</div>

          </div>
         
          
          <div className=" bg-white shadow-md rounded-xl pt-1 pr-3 overflow-hidden bg-gray-200  flex flex-col items-center h-full">
            <div className="w-[80%] flex justify-center">
              <Calendar />
            </div>

            <h2 className="text-xl font-semibold mb-2 ml-7 self-start">Tasks</h2>
            {/* ✅ Wider Scrollable Task List */}
            <div className=" w-[90%] max-w-[600px] overflow-y-auto p-4 bg-white rounded-lg shadow-md">
              <TaskList tasks={tasks} setTasks={setTasks} username={props.usernamee} />
              <Chat/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;