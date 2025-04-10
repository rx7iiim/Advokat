import { useState, useRef } from "react";
import { useForm } from "../../../../components/contexts/FormContext";
import axios from "axios";
import * as dotenv from 'dotenv';
dotenv.config();

const Verification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const { formData, setError, setErrtext } = useForm();

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");
    const email = formData.email;
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    try {
    const response = await axios.post(`${API_URL}/auth/verify-email`, {
    email,
     code,
      });

    if (response.data) {
       alert("Email verified successfully!");
     } else {
         setError(true);
         setErrtext(response.data.message || "Verification failed");
      }
     } catch (error) {
       setError(true);
       setErrtext(error.response?.data?.message || "An error occurred while verifying the email.");
     }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-3xl font-bold">Please check your email</h2>
      <p className="text-gray-600">
        We’ve sent an email with an activation code to{" "}
        <span className="font-semibold">{formData.email}</span>
      </p>

      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* OTP Inputs */}
        <div className="flex gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 border-2 border-gray-300 text-center text-xl font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          className="px-6 py-2 border-2 border-blue-500 text-blue-500 rounded-xl font-bold hover:bg-blue-500 hover:text-white transition"
        >
          Verify
        </button>
      </div>

      <p className="text-gray-600 mt-2">
        I didn’t receive a code{" "}
        <span className="font-semibold cursor-pointer underline">Resend</span>
      </p>
    </div>
  );
};

export default Verification;