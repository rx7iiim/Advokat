"use client";

import { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaBriefcase } from "react-icons/fa";
import TextField from "@mui/material/TextField";
import { useForm } from "../../../../components/contexts/FormContext";

const Step4 = () => {
  const [profileImage, setProfileImage] = useState(null);

  const { formData, updateFormData, error, setError,errorText,setErrtext } = useForm();

  const rolePlans = {
    FirmManager: [
      { name: "Starter", price: "15,000" },
      { name: "Growth", price: "30,000" }
    ],
    "Individual Lawyer": [
      { name: "Basic", price: "2,500" },
      { name: "Pro", price: "5,500" },
      { name: "Premium", price: "10,000" }
    ],
    FirmLawyer: [
      { name: "No plan", price: "0" }
    ]
  };
  

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const phoneRegex = /^\d{0,10}$/;
    

    
      
    

    updateFormData(name, value); 
  }
    const handleRoleChange = (e) => {
    const newRole = e.target.value;
    updateFormData("role", newRole);
    
   
    updateFormData("firmPlan", null);
    updateFormData("individPlan", null);
    updateFormData("planPrice", null);
    updateFormData("firmLawyer", newRole === "FirmLawyer");

   
    const firstPlan = rolePlans[newRole][0];
    if (newRole === "FirmManager") {
      updateFormData("firmPlan", firstPlan.name);
    } else if (newRole === "Individual Lawyer") {
      updateFormData("individPlan", firstPlan.name);
    }
    updateFormData("planPrice", firstPlan.price);
  };
  const getCurrentPlan = () => {
    if (formData.role === "FirmManager") {
      return formData.firmPlan;
    } else if (formData.role === "Individual Lawyer") {
      return formData.individPlan;
    }
    return "No plan";
  };

  const getCurrentPlanOptions = () => {
    return rolePlans[formData.role] || [];
  };

  return (
    <div className="w-full h-[45vh] flex flex-col justify-center md:flex-row gap-6 p-6  rounded-lg">
      <div className="flex flex-col items-stretch h-full">
  
  <div className="flex flex-row justify-center gap-[10px]  flex-[0.7]">
    <TextField
      label="First Name"
      className="rounded-2xl w-2/5"
      name="first_name"
      value={formData.first_name}
      onChange={handleChange}
      required
    />

    <TextField
      label="Family Name"
      className="rounded-2xl w-2/5"
      name="last_name"
      value={formData.last_name}
      onChange={handleChange}
      required
    />

    <TextField
      label="Username"
      className="rounded-2xl w-2/5"
      name="username"
      value={formData.username}
      onChange={handleChange}
      required
    />
</div>
<div className="flex flex-row justify-center gap-[33px]  ">
    <TextField
      label="Email"
      className="rounded-2xl w-full"
      name="email"
      value={formData.email}
      onChange={handleChange}
      type="email"
      required
    />

    <TextField
      label="Phone Number"
      className="rounded-2xl w-full"
      name="phone"
      inputProps={{ maxLength: 10 }}
      value={formData.phone}
      onChange={handleChange}
      required
    />
  </div>

  <div className="flex flex-row justify-center gap-[33px]  ">
 
    <div className="w-full">
      <label className="block text-gray-700 text-sm mb-1">Role</label>
      <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
        <FaBriefcase className="text-gray-400" />
        <select className="ml-2 w-full outline-none bg-transparent" value={formData.role} 
        onChange={handleRoleChange}>
          <option value='FirmManager'>Firm Manager</option>
          <option value='Individual Lawyer'>Individual Lawyer</option>
          <option value='FirmLawyer'>Firm Lawyer</option>
        </select>
      </div>
    </div>

   
    <div className="w-full">
      <label className="block text-gray-700 text-sm mb-1">Plan</label>
      <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
        <FaBriefcase className="text-gray-400" />
        <select
            className="ml-2 w-full outline-none bg-transparent"
            value={`${getCurrentPlan()}|${formData.planPrice}`}
            onChange={(e) => {
              const [name, price] = e.target.value.split("|");
              if (formData.role === "FirmManager") {
                updateFormData("firmPlan", name);
              } else if (formData.role === "Individual Lawyer") {
                updateFormData("individPlan", name);
              }
              updateFormData("planPrice", price);
            }}
            disabled={formData.role === "FirmLawyer"}
          >
            {getCurrentPlanOptions().map((plan) => (
              <option key={plan.name} value={`${plan.name}|${plan.price}`}>
                {plan.name} ({plan.price} DZD/mo)
              </option>
            ))}
          </select>
      </div>
    </div>
  </div>
</div>

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
        <p className="text-xs text-gray-500 mt-2">
          JPG, JPEG, PNG less than 1MB
        </p>
      </div>
    </div>
  );
};

export default Step4;
