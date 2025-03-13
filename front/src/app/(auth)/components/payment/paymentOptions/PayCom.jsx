import { useState } from "react";
import PayStep1 from "./PayStep1";
import PayStep2 from './PayStep2';
import { useForm } from "../../../../components/contexts/FormContext";

const PayCom = ({setStep}) => {
  const { formData, updateFormData } = useForm();
  const [selectedOption, setSelectedOption] = useState(formData.payment.paymentMethod || "CIB"); 
  const [showPayStep2, setShowPayStep2] = useState(false);

  // Handle payment method change
  const handlePaymentChange = (method) => {
    setSelectedOption(method);
    updateFormData("payment", { ...formData.payment, paymentMethod: method }); 
  };
  const handlePayButton = ()=>{
    /* here implement send card data to back functions */
    setShowPayStep2(true);
  }

  return (
    <div className="max-w-md h-full mx-auto p-6 bg-inherit rounded-lg flex flex-col justify-around">
      <div className="flex flex-col">
        <h2 className="text-3xl font-bold">Payment</h2>
        <h3 className="font-mona font-semibold text-lg mb-3">Pay With:</h3>
        
        <div className="flex space-x-4 mb-4">
          
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="payOption"
              value="CIB"
              checked={selectedOption === "CIB"}
              onChange={() => handlePaymentChange("CIB")}
              className="hidden"
            />
            <span
              className={`w-4 h-4 border-2 ${
                selectedOption === "CIB" ? "border-blue-500" : "border-gray-400"
              } rounded-full flex items-center justify-center`}
            >
              {selectedOption === "CIB" && (
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              )}
            </span>
            <span className="font-mona text-gray-800">CIB</span>
          </label>

       
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="payOption"
              value="Edahabia"
              checked={selectedOption === "Edahabia"}
              onChange={() => handlePaymentChange("Edahabia")} 
              className="hidden"
            />
            <span
              className={`w-4 h-4 border-2 ${
                selectedOption === "Edahabia" ? "border-blue-500" : "border-gray-400"
              } rounded-full flex items-center justify-center`}
            >
              {selectedOption === "Edahabia" && (
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              )}
            </span>
            <span className="font-mona text-gray-800">Edahabia</span>
          </label>
        </div>
      </div>
     {!showPayStep2 &&<PayStep1 onNext={handlePayButton} className="h-3/4" />}
     {showPayStep2 && <PayStep2 setStep={setStep} className="h-3/4" />}
      
    </div>
  );
};

export default PayCom;


