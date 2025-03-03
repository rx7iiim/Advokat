'use client';

import { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaBriefcase } from "react-icons/fa";
import TextField from '@mui/material/TextField';

const Step4 = () => {
  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="w-full h-[45vh] flex flex-col md:flex-row gap-6 p-6  rounded-lg">

      <div className="flex-1 grid grid-cols-2 gap-4">
        
      <TextField  label='label' className='rounded-2xl' 
         placeholder='place'  
      required />

        
<TextField  label='label' className='rounded-2xl' 
         placeholder='place'  
      required />

       
<TextField  label='label' className='rounded-2xl' 
         placeholder='place'  
      required />

       
<TextField  label='label' className='rounded-2xl' 
         placeholder='place'  
      required />

<TextField  label='label' className='rounded-2xl' 
         placeholder='place'  
      required />


        {/* Role */}
        <div>
          <label className="block text-gray-700 text-sm mb-1">Role</label>
          <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
            <FaBriefcase className="text-gray-400" />
            <select className="ml-2 w-full outline-none bg-transparent">
              <option>Firm Manager</option>
              <option>Admin</option>
              <option>Employee</option>
            </select>
          </div>
        </div>

        {/* Plan */}
        <div>
          <label className="block text-gray-700 text-sm mb-1">Plan</label>
          <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
            <FaBriefcase className="text-gray-400" />
            <select className="ml-2 w-full outline-none bg-transparent">
              <option>Starter (15,000 DZD/mo)</option>
              <option>Pro (30,000 DZD/mo)</option>
              <option>Enterprise (Custom)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Right Side - Profile Picture Upload */}
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-6 w-[200px] h-[200px] bg-white">
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <label className="cursor-pointer text-blue-500 hover:underline text-center">
            Click to upload <br /> or drag and drop
            <input
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        )}
        <p className="text-xs text-gray-500 mt-2">JPG, JPEG, PNG less than 1MB</p>
      </div>
    </div>
  );
};

export default Step4;
