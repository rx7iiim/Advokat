"use client"
import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Lawyer from '../lawyers/lawyer';
import ClientModal from './createClient';
import Sidebar from '@/app/components/sidebar/Sidebar';
import Image from 'next/image';
import * as dotenv from 'dotenv';
import Link from 'next/link';
import Client from './clientInterface';
import Chat from '@/app/components/chat/Chat';
dotenv.config();

function UserCards() {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [user,setUser]=useState<any|null>(null)
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const didRunRef = useRef(false);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  

  useEffect(() => {
    if (didRunRef.current) return;
    didRunRef.current = true;
    const loaddata = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/session`, {
          credentials: 'include',
        });
        const data = await res.json();
        if (!data.authenticated || !data.username) {
          router.push('/login');
        } else {
          console.log(data)
          setUser(data.user)
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
          setClients(data);
       
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



  const handleAddClient = (newClient: Client) => {
    setClients((prev) => [...prev, newClient]);
    setShowModal(false); // Close the modal
  };


  const deleteclient = async (id: string) => {
    try {
      console.log(id)
      const response = await fetch(`${API_URL}/clients?phoneNumber=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setClients(clients.filter((client) => client.phoneNumber !== id));
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

    <div className="flex gap-2 min-h-screen text-gray-800 p-2 bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <Sidebar user={user} />
      <div className="invisible w-[21%] h-[100vh]" aria-hidden="true"></div>
      <div className="flex-1 p-2">
        <div className="bg-white flex flex-col justify-start gap-[10px] shadow-md rounded-xl p-4 relative">
          <div className="flex justify-between items-center w-full">
            <p className="text-3xl font-bold mb-3">Clients</p>

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


          <div className="grid grid-cols-4 gap-4 mt-2">
  {filteredClients.length > 0 ? (
    filteredClients.map((client) => (
      <div
        key={client.client_id}
        onClick={() => setSelectedClient(client)}
        className="relative cursor-pointer h-auto border border-transparent bg-gray-100 shadow-[1px_2px_10px_rgba(0,0,0,0.20)] rounded-lg flex flex-col justify-center items-center text-white p-4"
      >
        {/* Edit/Delete Buttons */}
        <div className="absolute top-0 right-0 inline-flex divide-x divide-gray-400 overflow-hidden rounded shadow-sm m-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Edit logic here
            }}
            className="px-1 py-1.5 bg-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-500 hover:text-gray-900"
          >
            <img src="/edit-svgrepo-com.svg" alt="edit" className="size-2" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteclient(client.phoneNumber);
            }}
            className="px-1 py-1.5 bg-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-500 hover:text-gray-900"
          >
            <img src="/delete-svgrepo-com.svg" alt="delete" className="size-2" />
          </button>
        </div>

        {/* Avatar */}
        <div className="mb-2 mt-2 w-[100px] h-[100px] bg-cyan-700 rounded-full flex justify-center items-center">
          <p className="font-bold text-xl">{client.fullName.charAt(0).toUpperCase()}</p>
        </div>

        {/* Details */}
        <h5 className="mb-2 text-xl font-bold text-gray-900">{client.fullName}</h5>
        <div className="flex items-center gap-2">
          <img src="/phone-svgrepo-com.svg" alt="sdijf" width={20} />
          <p className="text-gray-700 text-xs my-1">{client.phoneNumber}</p>
        </div>
        <div className="flex items-center gap-2">
          <img src="/contact-book-svgrepo-com.svg" alt="dsho" width={20} />
          <p className="text-gray-700 text-xs my-1">{client.contactInfo}</p>
        </div>
        <div className="flex items-center gap-2">
          <img src="/email-1572-svgrepo-com.svg" alt="sdlkjf" width={18} />
          <p className="text-gray-700 text-xs my-1">{client.email}</p>
        </div>
      </div>
    ))
  ) : (
    <p className="text-gray-500 text-lg mt-4">No clients found.</p>
  )}

  {/* Add Lawyer Button */}
  <div className="col-span-4 flex justify-end mt-2">
    <button
      onClick={() => setShowModal(true)}
      className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-2 py-3 rounded-2xl shadow-[2px_2px_10px_rgba(0,0,0,0.20)] hover:bg-blue-700 transition-all duration-200 active:scale-95 text-sm sm:text-base"
    >
      <img src="/plus-circle-svgrepo-com (1).svg" alt="dsj" className="w-5 h-5  sm:w-6 sm:h-6" />
      <span>Add Lawyer</span>
    </button>
  </div>

  {/* Add Client Modal */}
  {showModal && (
    <ClientModal
      onClose={() => setShowModal(false)}
      username={username}
      onUserCreated={handleAddClient}
    />
  )}

  {/* Detail Modal */}
  {selectedClient && (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => setSelectedClient(null)}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={() => setSelectedClient(null)}
        >
          ✕
        </button>
        <div className="flow-root">
  <dl className="-my-3 divide-y divide-gray-200 text-sm">
    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
      <dt className="font-medium text-gray-900">Full name</dt>

      <dd className="text-gray-700 sm:col-span-2">{selectedClient.fullName}</dd>
    </div>

    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
      <dt className="font-medium text-gray-900">Phone number </dt>

      <dd className="text-gray-700 sm:col-span-2">{selectedClient.phoneNumber}</dd>
    </div>

    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
      <dt className="font-medium text-gray-900">Contact info</dt>

      <dd className="text-gray-700 sm:col-span-2">{selectedClient.contactInfo}</dd>
    </div>

    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
      <dt className="font-medium text-gray-900">Case</dt>

      <dd className="text-gray-700 sm:col-span-2">{selectedClient.phoneNumber}</dd>
    </div>

    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
      <dt className="font-medium text-gray-900">Bio</dt>

      <dd className="text-gray-700 sm:col-span-2">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et facilis debitis explicabo
        doloremque impedit nesciunt dolorem facere, dolor quasi veritatis quia fugit aperiam
        aspernatur neque molestiae labore aliquam soluta architecto?
      </dd>
    </div>
  </dl>
</div>
 
      </div>
    </div>
  )}
</div>

        </div>
      </div>
      <Chat/>
    </div>
  );
}

export default UserCards;