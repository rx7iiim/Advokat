'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AiFillHome } from 'react-icons/ai';
import { FaUserEdit, FaLock } from 'react-icons/fa';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const ProfileCard: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<any | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
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
          setFirstName(data.user.firstName || '');
          setLastName(data.user.lastName || '');
          setPhoneNumber(data.user.phoneNumber || '');
          setRole(data.user.role || '');
        }
      })
      .catch(() => {
        router.push('/login');
      });
  }, [router]);

  const handleSaveChanges = async () => {
    try {
      const res = await fetch(`${API_URL}/user/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          firstName,
          lastName,
          phoneNumber,
          role,
        }),
      });

      if (!res.ok) throw new Error('Failed to update profile');
      alert('Profile updated successfully!');
    } catch (error) {
      console.error(error);
      alert('Error updating profile.');
    }
  };

  if (!user) return null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100 p-4">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
         <Link href={`/user/${user.username}/home`} className="absolute top-4 right-4 text-blue-500 hover:text-blue-700">
          <AiFillHome size={24} />
        </Link>

        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <img src="/user-svgrepo-com.svg" alt="Profile" className="w-28 h-28 rounded-full object-cover" />
          <div className="flex-1 space-y-2">
            <h2 className="text-2xl font-semibold text-blue-600">{user.username}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone Number" className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
          <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role" className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Current Password" className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="mt-6 flex justify-end">
          <button onClick={handleSaveChanges} className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
