"use client";

import { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaBriefcase } from "react-icons/fa";
import TextField from "@mui/material/TextField";
import { useForm } from "../../../../components/contexts/FormContext";

const Step4 = () => {
  const [profileImage, setProfileImage] = useState(null);

  const { formData, updateFormData, error, setError,errorText,setErrtext } = useForm();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const phoneRegex = /^\d{0,10}$/;
    // Validate email only for email field
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
      
      setError(!emailRegex.test(value));
      setErrtext("invalid email"); // Set error state if email is invalid
    }else if(name==="phone" && !phoneRegex.test(value)){
      setError(true);
      setErrtext("invalid phone number");
    }
      
    

    updateFormData(name, value); // Update form data
  };

  return (
    <div className="w-full h-[45vh] flex flex-col md:flex-row gap-6 p-6  rounded-lg">
      <div className="flex flex-col items-stretch h-full">
  
  <div className="flex flex-row flex-wrap justify-center gap-[10px]  flex-[0.7]">
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
      className="rounded-2xl w-1/5"
      name="username"
      value={formData.username}
      onChange={handleChange}
      required
    />

    <TextField
      label="Email"
      className="rounded-2xl w-1/5"
      name="email"
      value={formData.email}
      onChange={handleChange}
      type="email"
      required
    />

    <TextField
      label="Phone Number"
      className="rounded-2xl w-1/5"
      name="phone"
      inputProps={{ maxLength: 10 }}
      value={formData.phone}
      onChange={handleChange}
      required
    />
  </div>

  <div className="flex flex-row justify-between flex-[0.3]">
 
    <div className="w-2/5">
      <label className="block text-gray-700 text-sm mb-1">Role</label>
      <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
        <FaBriefcase className="text-gray-400" />
        <select className="ml-2 w-full outline-none bg-transparent" value={formData.role} // Bind value to formData
        onChange={(e) => updateFormData("role", e.target.value)}>
          <option value='FirmManager'>Firm Manager</option>
          <option value='IndividLawyer'>Individual Lawyer</option>
          <option value='FirmLawyer'>Firm Lawyer</option>
        </select>
      </div>
    </div>

   
    <div className="w-2/5">
      <label className="block text-gray-700 text-sm mb-1">Plan</label>
      <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
        <FaBriefcase className="text-gray-400" />
        <select
        className="ml-2 w-full outline-none bg-transparent"
        name="firmPlan"
        value={formData.firmPlan}
        onChange={(e) => {
          const selectedOption = e.target.value.split("|"); // Split the value into name and price
          updateFormData("firmPlan", selectedOption[0]); // Plan Name
          updateFormData("planPrice", selectedOption[1]); // Plan Price
        }}
      >
        { formData.role === 'Individual Lawyer' && 
          (<>
          <option value="Basic|2,500">Basic (2,500 DZD/mo)</option>
          <option value="Pro|5,500">Pro (5,500 DZD/mo)</option>
          <option value="Premium|10,000">Premium (10,000 DZD/mo)</option>
          </>
          )
        }
         { formData.role === 'Firm Manager' && 
          (<>
          <option value="Starter|15,000">Starter (15,000 DZD/mo)</option>
          <option value="Growth|30,000">Growth (30,000 DZD/mo)</option>
          
          </>
          )
        }
        { formData.role === 'FirmLawyer' && 
          (<>
          <option selected>No plan</option>
          
          </>
          )
        }
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
