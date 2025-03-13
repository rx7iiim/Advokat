import React from "react";
import { useForm } from "../../../components/contexts/FormContext";

function PlanSelected({step, setStep}) {
  const { formData, updateFormData } = useForm();

  
  return (
    <div className="max-w-md h-full mx-auto p-6 bg-inherit rounded-lg flex flex-col justify-between">
      <div>
        <h2 className="font-mona text-3xl font-bold">Plan Selected</h2>
        <h3 className="font-mona text-xl font-semibold">{formData.role}</h3>
      </div>

      <div className="shadow-[1px_5px_28px_1px_rgba(0,0,0,0.75)] h-3/4 w-[300px] rounded-2xl p-5 bg-white flex flex-col justify-between">
        <h3 className="font-mona text-3xl font-bold">
          {formData.role === "Firm Manager"
            ? formData.firmPlan
            : formData.individPlan}
        </h3>
        <p className="font-mona text-2xl font-bold">
          {formData.planPrice} DZD/month
        </p>
        <p className="font-mona text-gray-500">Can cancel anytime</p>

        <div className="mt-4">
          <div className="flex justify-between font-mona font-semibold text-gray-700">
            <span>Cases</span>
            <span>50</span>
          </div>
          <div className="flex justify-between font-mona font-semibold text-gray-700">
            <span>Storage</span>
            <span>50GB</span>
          </div>
        </div>

        <button onClick={()=>{setStep(3)}} className="mt-4 w-full border-2 border-blue-500 text-blue-500 font-mona font-bold py-2 rounded-lg hover:bg-blue-50">
          Change plan
        </button>
      </div>
    </div>
  );
}

export default PlanSelected;
