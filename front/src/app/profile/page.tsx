'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const ProfileCard: React.FC = () => {
  const router = useRouter();
  const [showCard, setShowCard] = useState(true);
  const [user, setUser] = useState<any | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('');
  const didRunRef = useRef(false);

  useEffect(() => {
    if (didRunRef.current) return;
    didRunRef.current = true;

    fetch(`${API_URL}/auth/session`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated || !data.username) {
          router.push('/login');
        } else {
          setUser(data.user);
          setUsername(data.username);
          setFirstName(data.user.firstName);
          setEmail(data.user.email || 's_bdirina@estin.dz');
          setPhoneNumber(data.user.phoneNumber || '');
          setRole(data.user.role || '');
        }
      })
      .catch(() => {
        router.push('/login');
      });
  }, [router]);

  if (!showCard) return null;

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="relative max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-md space-y-4">
    
           <Link href = "user/undefined/home"
        className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl font-bold"
        aria-label="Close"
      >
        × 
    </Link>

      <div className="flex justify-center">
        <img
          src="/sofia.png"
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h1 className="text-xl mt-4 ml-6 font-serif">Welcome : {username}</h1>
          <p className="text-xl ml-6 font-serif">s_bdirina@estin.dz</p>
        </div>
      </div>

      <div className="space-y-3">
        <input
          type="text"
          value={username || ''}
          readOnly
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
           value={email}
          readOnly
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={firstName || ''}
          readOnly
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          // value={phoneNumber}
          value = "0659243451"
          readOnly
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={role}
          readOnly
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="mt-6 md:mt-8 mb-8 md:mb-16 px-6 py-3 text-white font-semibold bg-customGray rounded-3xl shadow-lg hover:bg-blue-600 transition-colors w-full md:w-auto">
          Save Changes
        </button>
      </div>
    </div>
    </div>
  );
};

export default ProfileCard;
