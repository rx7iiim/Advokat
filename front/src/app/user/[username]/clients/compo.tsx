
"use client"
import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Client from './clientInterface';
import ClientModal from './createClient';
import Sidebar from '@/app/components/sidebar/Sidebar';
import Image from 'next/image';
import * as dotenv from 'dotenv';
import Link from 'next/link';
import { error } from 'console';

dotenv.config();

function UserCards() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const loaddata = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/session`, {
          credentials: 'include',
        });
        const data = await res.json();
        if (!data.authenticated || !data.username) {
          router.push('/login');
        } else {
          setUsername(data.username);
        }
      } catch (error) {
        console.error('Error fetching session:', error);
        router.push('/login');
      }
    };
    loaddata();
  }, [API_URL, router]);

  useEffect(() => {
    if (username) {
      const fetchClient = async () => {
        try {
          const response = await fetch(`${API_URL}/clients/clients?username=${username}`);
          if (!response.ok) {
            throw new Error('Failed to fetch Client');
          }
          const data = await response.json();
          console.log(data)
          setClients(data);
          console.log(clients);
       
        } catch (error) {
          console.error('Error fetching clients:', error);
        }
      };
      fetchClient();
     
    }
  }, [API_URL, username]);

  useEffect(() => {
    if (query) {
      setFilteredClients(
        clients.filter((client) =>
          client.fullName.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setFilteredClients(clients);
    }
  }, [query, clients]);

  const deleteclient = async (id: string) => {
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

  if (!username)
    return (
      <div className=" w-full h-full flex justify-center items-center h-18">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );

  return (

    <div className="flex flex-row overflow-hidden min-h-screen text-gray-800 p-2 bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <Sidebar />
      <div className="invisible w-[260px] h-[100vh]" aria-hidden="true"></div>
      <div className="flex-1 p-2 overflow-y-auto">
        <div className="bg-white shadow-md rounded-xl flex flex-col justify-start gap-[10px] p-4">
          <div className="flex justify-between items-center w-full">
            <p className="text-3xl font-bold mb-3">Clients</p>
            <div className="col-start-4 row-start-auto flex justify-center items-end h-30">
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-4 py-4 mb-5 rounded-xl shadow-md hover:bg-blue-700 transition-all duration-200 active:scale-95 text-sm sm:text-base"
              >
                <img src="/plus-circle-svgrepo-com (1).svg" alt="Add lawyer" className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="hidden sm:inline">Add client</span>
              </button>
              {showModal && (
                <ClientModal onClose={() => setShowModal(false)} username={username} />
              )}
            </div>
            <div className="relative w-full max-w-xs">
              {/* Search Input */}
              <input
                type="text"
                placeholder="Search Clients name"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-5 py-3 pr-14 border border-gray-300 rounded-full outline-none shadow-md focus:ring-2 focus:ring-blue-400 text-gray-700 transition-all"
              />

              {/* Search Icon Button (Inside Input) */}
              <button
                className="absolute top-0 right-0 h-full w-14 flex items-center justify-center bg-blue-600 hover:bg-blue-700 rounded-r-full transition-all"
                aria-label="Search"
              >
                <img src="/search.png" alt="Search" className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          <div className="flex flex-row justify-start flex-wrap gap-[10px]">
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (

                <div key={client.client_id} className="relative min-w-[100px] w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-12px)] lg:w-[calc(25%-12px)] px-2 border border-transparent bg-gray-100 shadow-[1px_2px_10px_rgba(0,0,0,0.20)] rounded-lg flex flex-col justify-center items-center h-[300px] text-white">

                  
                  <div className="absolute top-0 right-0 inline-flex divide-x divide-gray-400 overflow-hidden rounded 
                    shadow-sm m-2">
                    <button
                      type="button"
                      className="px-1 py-1.5 bg-gray-300 text-sm font-medium text-gray-70 hover:bg-gray-500 hover:text-gray-900 focus:relative"
                      aria-label="view"
                    >
                      <img src="/edit-svgrepo-com.svg" alt="edit client" className="size-2 color-white" />
                    </button>

                    <button
                      className="px-1 py-1.5 bg-gray-300 text-sm font-medium text-gray-70 transition-colors hover:bg-gray-500 hover:text-gray-900 focus:relative"
                      aria-label="View"
                      onClick={() => deleteclient(client.client_id)}
                    >
                      <img src="/delete-svgrepo-com.svg" alt="edit client" className="size-2 color-white" />
                    </button>
                  </div>

                <div>

                  <Image
  src={client.pfp}
  alt="Client Image"
  width={100}
  height={100}
  className='scale-75 rounded-full'

  
/></div>
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 font-mona">{client.fullName}</h5>
              <div className='flex flex-col justify-around h-2/5  w-full'>
                  <div className="flex flex-row justify-center gap-[15px] w-full ">

                    <img src="/phone-svgrepo-com.svg" alt="our logo" width={20} height={18} className="" />
                    <div className='w-3/4 overflow-hidden'><p className="font-mona w-5/6 text-gray-100 text-xs dark:text-gray-400 ">{client.phoneNumber}</p></div>
                  </div>
                  <div className="flex flex-row justify-center gap-[15px] w-full">
                    <img src="/contact-book-svgrepo-com.svg" alt="our logo" width={20} height={18} className="mr-1" />
                    <div className='w-3/4 overflow-hidden'><p className="font-mona w-5/6 text-gray-100 text-xs dark:text-gray-400 ">{client.contactInfo}</p></div>
                  </div>
                  <div className="flex flex-row justify-center gap-[15px] w-full">
                    <img src="/email-1572-svgrepo-com.svg" alt="our logo" width={18} height={18} className="mb-2 mr-1" />
                    <div className='w-3/4 overflow-hidden'><p className="mb-2 font-mona w-5/6 text-gray-100 text-xs dark:text-gray-400 ">{client.email}</p></div>
                  </div>
                  </div>
                </div>

        

              ))
            ) : (
              <p className="text-gray-500 text-lg mt-4">No clients found.</p>
            )}

           
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCards;
