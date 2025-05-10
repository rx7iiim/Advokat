"use client";
import React, { useState } from "react";
import * as dotenv from 'dotenv';
import Lawyer from "./lawyer";

dotenv.config();

interface LawyerModalProps {
  onClose: () => void;
  username: string;
  onUserCreated: (newClient: Lawyer) => void;
}

export default function LawyerModal({ onClose, onUserCreated, username }: LawyerModalProps) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [numberOfCasesLost, setNumberOfCasesLost] = useState(0);
  const [numberOfCasesWon, setNumberOfCasesWon] = useState(0);
  const [experienceYears, setExperienceYears] = useState(0);
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
      formData.append("numberOfCasesLost", numberOfCasesLost.toString());
      formData.append("numberOfCasesWon", numberOfCasesWon.toString());
      formData.append("experienceYears", experienceYears.toString());

      if (pfp) {
        formData.append("pfp", pfp);
      }

      const res = await fetch(`${API_URL}/lawyers/lawyer?username=${username}`, {
        method: "POST",
        body: formData, 
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }
       const createdLawyer={
        lawyer_id:"",
        lawyerUsername :fullName,
         email: email,
         phoneNumber: phoneNumber,
        contactInfo:contactInfo,
        numberOfCasesLost:numberOfCasesLost,
        numberOfCasesWon:numberOfCasesWon,
      pfp:""
    }

      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setContactInfo("");
      setNumberOfCasesLost(0);
      onUserCreated(createdLawyer);
      setNumberOfCasesWon(0);
      setExperienceYears(0);
      setPfp(null);

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
        className="bg-white p-6 rounded-2xl w-[450px] max-h-[90vh] overflow-y-auto shadow-lg flex flex-col gap-4"
      >
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Add New Lawyer</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input type="text" placeholder="username" value={fullName} onChange={(e) => setFullName(e.target.value)} className="border p-2 rounded-lg focus:outline-none focus:border-blue-400" required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 rounded-lg focus:outline-none focus:border-blue-400" required />
        <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="border p-2 rounded-lg focus:outline-none focus:border-blue-400" />
        <input type="text" placeholder="Contact Info" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} className="border p-2 rounded-lg focus:outline-none focus:border-blue-400" />

        <div className="flex flex-row gap-4">
          <div>
          <span className="text-xs ">number of cases lost </span>
          <input type="number" placeholder="Cases Lost" value={numberOfCasesLost} onChange={(e) => setNumberOfCasesLost(Number(e.target.value))} className="border p-2 rounded-lg focus:outline-none focus:border-blue-400 w-full" />
          </div>
          <div>
         
          <span className="text-xs">number of cases won </span>
          <input type="number" placeholder="Cases Won" value={numberOfCasesWon} onChange={(e) => setNumberOfCasesWon(Number(e.target.value))} className="border p-2 rounded-lg focus:outline-none focus:border-blue-400 w-full" />
        </div>
        </div>
        <span className="text-base ">Exprience years </span>

        <input type="number" placeholder="Experience Years" value={experienceYears} onChange={(e) => setExperienceYears(Number(e.target.value))} className="border p-2 rounded-lg focus:outline-none focus:border-blue-400" />

        <label className="border p-2 rounded-lg cursor-pointer flex items-center justify-between text-gray-600">
          <span>{pfp ? pfp.name : "Upload Profile Picture"}</span>
          <input type="file" accept="image/*" onChange={(e) => setPfp(e.target.files?.[0] || null)} className="hidden" />
        </label>

        <div className="flex flex-row justify-between">
          <button type="submit" disabled={loading} className="bg-blue-500 w-[150px] text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50">
            {loading ? "Submitting..." : "Submit"}
          </button>
          <button type="button" onClick={onClose} className="bg-red-500 w-[150px] text-white py-2 rounded-lg hover:bg-red-600 transition">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
