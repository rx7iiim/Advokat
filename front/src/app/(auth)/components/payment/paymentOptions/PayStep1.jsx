import React from "react";
import { useForm } from "../../../../components/contexts/FormContext";

function PayStep1({ onNext }) {
  const { formData, updateFormData } = useForm();

  
  const handleChange = (field, value) => {
    
    const numericValue = value.replace(/\D/g, '');
    
    
    let processedValue = numericValue;
    if (field === "CardNumber") {
      processedValue = numericValue.slice(0, 16);
    } else if (field === "CardCVV") {
      processedValue = numericValue.slice(0, 3);
    } else {
      processedValue = value; 
    }
    
    updateFormData("payment", { ...formData.payment, [field]: processedValue });
  };


  const formatCardNumber = (value) => {
    if (!value) return "";
    return value.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  return (
    <div className="max-w-md p-6 bg-inherit rounded-lg h-3/4">
      <div className="grid grid-cols-2 gap-4 bg-inherit">
    
        <div className="col-span-2">
          <label className="font-mona text-sm text-gray-700">Card Number</label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="1234 5678 9101 1121"
            value={formatCardNumber(formData.payment.CardNumber || "")}
            onChange={(e) => handleChange("CardNumber", e.target.value)}
            className="w-full px-3 py-2 border-2 border-[#b2b2b2] rounded-md bg-inherit focus:border-[black]"
            maxLength={19} // 16 digits + 3 spaces
            required
          />
        </div>

        
        <div>
          <label className="font-mona text-sm text-gray-700">CVV</label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="123"
            value={formData.payment.CardCVV || ""}
            onChange={(e) => handleChange("CardCVV", e.target.value)}
            className="w-full px-3 py-2 border-2 border-[#b2b2b2] rounded-md bg-inherit focus:border-[black]"
            maxLength={3}
            required
          />
        </div>

       
        <div>
          <label className="font-mona text-sm text-gray-700">Expiration Date</label>
          <input
            type="text"
            placeholder="MM/YY"
            value={formData.payment.CardExpiration || ""}
            onChange={(e) => handleChange("CardExpiration", e.target.value)}
            className="w-full px-3 py-2 border-2 border-[#b2b2b2] rounded-md bg-inherit focus:border-[black]"
            required
          />
        </div>

        
        <div className="col-span-2">
          <label className="font-mona text-sm text-gray-700">Name</label>
          <input
            type="text"
            placeholder="John Doe"
            value={formData.payment.CardName || ""}
            onChange={(e) => handleChange("CardName", e.target.value)}
            className="w-full px-3 py-2 border-2 border-[#b2b2b2] rounded-md bg-inherit focus:border-[black]"
            required
          />
        </div>
      </div>

    
      <div className="flex items-center space-x-2 mt-4">
        <input type="checkbox" id="saveCard" className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
        <label htmlFor="saveCard" className="font-mona text-gray-700 text-sm cursor-pointer">
          Save card details
        </label>
      </div>

     
      <button onClick={onNext} className="w-full bg-blue-600 text-white font-mona font-bold py-3 rounded-md mt-5 hover:bg-blue-700">
        {`Pay ${formData.planPrice || 0} Dz/mo`}
      </button>
    </div>
  );
}

export default PayStep1;