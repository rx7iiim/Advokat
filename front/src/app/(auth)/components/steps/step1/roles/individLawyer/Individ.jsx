import React from "react";
import styles from "./individ.module.css";
import Option from "../../components/option/Option";

function Individ({ selectedPlan, handleRadioChange, isDisabled }) {
  const plans = [
    { label: "Basic", price: "2,500" },
    { label: "Pro", price: "5,500" },
    { label: "Premium", price: "10,000" },
  ];

  return (
    <div className="w-3xs flex flex-col justify-start gap-[10px]">
      <h1 className="text-center text-2xl ">Individual lawyer</h1>
      <div className="flex flex-col h-64 justify-start gap-4 items-center">
        {plans.map((ele, index) => (
          <Option
            elem={ele}
            key={index}
            isSelected={selectedPlan === ele.label}
            onSelect={() => handleRadioChange("Individual Lawyer", ele.label, ele.price)}
            isDisabled={isDisabled}
          />
        ))}
      </div>
    </div>
  );
}

export default Individ;
