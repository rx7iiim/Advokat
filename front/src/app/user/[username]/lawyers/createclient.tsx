"use client";
import React, { useState } from "react";
import * as dotenv from 'dotenv';
import Lawyer from "../lawyers/lawyer";

dotenv.config();

interface LawyerModalProps {
  onClose: () => void;
  username: string;
  onUserCreated: (newClient: Lawyer) => void;
}

export default function LawyerModal({ onClose,onUserCreated, username }: LawyerModalProps) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [pfp, setPfp] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("phoneNumber", phoneNumber);
      formData.append("contactInfo", contactInfo);
      if (pfp) {
        formData.append("pfp", pfp);
      }
      const res = await fetch(`${API_URL}/lawyers/lawyer?username=${username}`, {
        method: "POST",
        body: formData, 
      });
  
      if (!res.ok) {
        throw new Error(await res.text()); // Show backend error
      }
      const createdClient={
        lawyer_id:"",
        fullName :fullName,
         email: email,
         phoneNumber: phoneNumber,
        contactInfo:contactInfo,
      pfp:""
    }
      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setContactInfo("");
      setPfp(null);
      onUserCreated(createdClient);
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg w-[400px] shadow-xl flex flex-col gap-4"
      >
        <h2 className="text-xl font-semibold mb-2">Add New Client</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Contact Info"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          className="border p-2 rounded"
        />
        
        {/* File Input */}
        <label className="border p-2 rounded cursor-pointer">
          <span className="text-gray-500">{pfp ? pfp.name : "Upload Profile Picture"}</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPfp(e.target.files?.[0] || null)}
            className="hidden"
          />
        </label>
       <div className="flex flex-row justify-between">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 w-[150px] text-white p-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
        <button
          type="submit"
          onClick={onClose}
   className="bg-red-500 w-[150px] text-white p-2 rounded hover:bg-red-700 transition disabled:opacity-50"
        >cancel</button>
        </div>
      </form>
    </div>
  );
}
