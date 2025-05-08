"use client"
import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LawyerModal from './createclient';
import Sidebar from '@/app/components/sidebar/Sidebar';
import Image from 'next/image';
import * as dotenv from 'dotenv';
import Link from 'next/link';
import Lawyer from '../lawyers/lawyer';
dotenv.config();

function UserCards() {
  const [user,setUser]=useState<any|null>(null)
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const [Lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [filteredFiles, setFilteredFiles] = useState<File[]>([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const didRunRef =useRef(false);


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
    if (username) {
      const fetchLawyer = async () => {
        try {
          const response = await fetch(`${API_URL}/Lawyers/Lawyer?username=${username}`);
          if (!response.ok) {
            throw new Error('Failed to fetch Lawyer');
          }
          const data = await response.json();
          setLawyers(data);
          console.log(data);
       
        } catch (error) {
          console.error('Error fetching Lawyers:', error);
        }
      };
      fetchLawyer();
     
    }
  }, [API_URL, username]);

  useEffect(() => {
    if (query) {
      setFilteredLawyers(
        Lawyers.filter((Lawyer) =>
          Lawyer.fullName.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setFilteredLawyers(Lawyers);
    }
  }, [query, Lawyers]);



  const handleAddLawyer = (newLawyer: Lawyer) => {
    setLawyers((prev) => [...prev, newLawyer]);
    setShowModal(false); // Close the modal
  };


  const deleteLawyer = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/Lawyers?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setLawyers(Lawyers.filter((Lawyer) => Lawyer.lawyer_id !== id));
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

    <div className="flex flex-row min-h-screen text-gray-800 p-2 bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <Sidebar user={user} /> 
      <div className="invisible w-[260px] h-[100vh]" aria-hidden="true"></div>
      <div className="flex-1 p-2">
        <div className="bg-white flex flex-col justify-start gap-[10px] shadow-md rounded-xl p-4">
          <div className="flex justify-between items-center w-full">
            <p className="text-3xl font-bold mb-3">Lawyers</p>

            <div className="relative w-full max-w-xs">
              {/* Search Input */}
              <input
                type="text"
                placeholder="Search Lawyers name"
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


          <div className="flex flex-row justify-start flex-wrap gap-2 mt-2">
            {filteredLawyers.length > 0 ? (
              filteredLawyers.map((Lawyer) => (
                
                <div key={Lawyer.lawyer_id} className="relative w-1/4 h-auto border border-transparent bg-gray-100 shadow-[1px_2px_10px_rgba(0,0,0,0.20)] rounded-lg flex flex-col justify-center items-center  text-white">

                  
                  <div className="absolute top-0 right-0 inline-flex divide-x divide-gray-400 overflow-hidden rounded 
                    shadow-sm m-2">
                    <button
                      type="button"
                      className="px-1 py-1.5 bg-gray-300 text-sm font-medium text-gray-70 hover:bg-gray-500 hover:text-gray-900 focus:relative"
                      aria-label="view"
                    >
                      <img src="/edit-svgrepo-com.svg" alt="edit Lawyer" className="size-2 color-white" />
                    </button>

                    <button
                      className="px-1 py-1.5 bg-gray-300 text-sm font-medium text-gray-70 transition-colors hover:bg-gray-500 hover:text-gray-900 focus:relative"
                      aria-label="View"
                      onClick={() => deleteLawyer(Lawyer.lawyer_id)}
                    >
                      <img src="/delete-svgrepo-com.svg" alt="edit Lawyer" className="size-2 color-white" />
                    </button>
                  </div>
                
                <div className="mb-2 overflow-hidden w-[100px] h-[100px] bg-cyan-700 rounded-full flex justify-center items-center">
<p className='font-bold text-xl'>{ Lawyer.fullName.charAt(0).toUpperCase()}</p>
</div>
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">{Lawyer.fullName}</h5>
              
                  <div className="flex space-x-2 p-2 mr-14">
                    <img src="/phone-svgrepo-com.svg" alt="our logo" width={20} height={18} className="" />
                    <p className="font-normal text-gray-100 text-xs dark:text-gray-400 max-w-8">{Lawyer.phoneNumber}</p>
                  </div>
                  <div className="flex space-x-2 p-2 mr-14">
                    <img src="/contact-book-svgrepo-com.svg" alt="our logo" width={20} height={18} className="mr-1" />
                    <p className="font-normal text-gray-100 text-xs dark:text-gray-400 max-w-8">{Lawyer.contactInfo}</p>
                  </div>
                  <div className="flex space-x-2 p-2 mr-14">
                    <img src="/email-1572-svgrepo-com.svg" alt="our logo" width={18} height={18} className="mb-2 mr-1" />
                    <p className="mb-2 font-normal text-gray-100 text-xs dark:text-gray-400 max-w-8">{Lawyer.email}</p>
                  </div>
                </div>

               
              ))
            ) : (
              <p className="text-gray-500 text-lg mt-4">No lawyers found.</p>

            )}

            <div className="col-start-4 row-start-auto flex justify-center items-end h-30">
              <button
                onClick={
                  () => setShowModal(true)
                }
                className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-2 py-3 ml-8 mb-5 rounded-2xl shadow-[2px_2px_10px_rgba(0,0,0,0.20)]  hover:bg-blue-700 transition-all duration-200 active:scale-95 text-sm sm:text-base"
              >
                <img src="/plus-circle-svgrepo-com (1).svg" alt="Add lawyer" className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="hidden sm:inline">Add Lawyer</span>
              </button>
              {showModal && (
             <LawyerModal
             onClose={() => setShowModal(false)}
             username={username}
             onUserCreated={handleAddLawyer}  // Pass the handleAddLawyer function here
           />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCards;