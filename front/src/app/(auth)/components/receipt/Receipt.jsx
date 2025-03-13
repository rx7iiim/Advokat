import React from "react";
import {useForm} from '../../../components/contexts/FormContext';

function Receipt() {
    const { formData, updateFormData } = useForm();
  return (
    <div className="flex flex-col w-1/3 h-[80vh] items-center justify-around">
        <h2 className="text-3xl font-bold font-mona">Purchase Confirmed</h2>
        <div className="w-full flex flex-col gap-[10px] justify-between shadow-[1px_5px_28px_1px_rgba(0,0,0,0.75)] p-[10px] rounded-2xl">
      <div className="flex flex-row justify-between w-full font-mona">
        <p>Name:</p>
        <p>{formData.payment.CardName}</p>
      </div> 
      <div className="flex flex-row justify-between w-full font-mona">
        <p>Purchase Date:</p>
        <p>20.20.2020</p>
      </div>
      <div className="flex flex-row justify-between w-full font-mona">
        <p>Plan:</p>
        <p>{`${formData.role}-${formData.firmPlan ? formData.firmPlan : formData.individPlan}`}</p>
      </div>
      <div className="flex flex-row justify-between w-full font-mona">
        <p>Payment method:</p>
        <p>{formData.payment.paymentMethod}</p>
      </div>
      <div className="flex flex-row justify-between w-full font-mona">
        <p>Card Number:</p>
        <p>{formData.payment.CardNumber}</p>
      </div>
      <div className="flex flex-row justify-between w-full font-mona">
        <p>Expiration Date:</p>
        <p>{formData.payment.CardExpiration}</p>
      </div>
      <div className="flex flex-row justify-between w-full font-mona">
        <span></span>
      <button className="text-gray-500">Download receipt</button>
      </div>
      </div>
      <button>Access my profile</button>
    </div>
  );
}

export default Receipt;
