'use client';
import React, {useState, useRef} from 'react'

function PayStep2({setStep}) {

  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const handleConfirmPayment = () => {
   
    setStep(6);
  };

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // Ensure only numbers are entered

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
  return (
    
      <div className="flex flex-col justify-around items-center h-3/4 gap-[10px] ">
        <div>
        <p className='text-lg font-300'>Enter the 4-digit code sent to the phone number connected to this card to confirm the payment </p>
        </div>
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
        
          <button onClick={handleConfirmPayment} className="w-full bg-blue-600 text-white font-mona font-bold p-3 rounded-md mt-5 hover:bg-blue-700">confirm payment</button>
      
        </div>
    
  )
}

export default PayStep2
