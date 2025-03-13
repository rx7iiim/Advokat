import React from "react";
import styles from "./firmmanager.module.css";
import Option from "../../components/option/Option";

function FirmManager({ selectedPlan, handleRadioChange, isDisabled }) {
  const plans = [
    { label: "Starter", price: "15,000" },
    { label: "Growth", price: "30,000" },
  ];

  return (
    <div className="w-3xs flex flex-col justify-start gap-[10px]">
      <h1 className="text-center text-2xl">Firm Manager</h1>
      <div className="flex flex-col h-64 justify-start items-center gap-4">
        {plans.map((ele, index) => (
          <Option
            key={index}
            elem={ele}
            isSelected={selectedPlan === ele.label}
            onSelect={() => handleRadioChange("Firm Manager", ele.label, ele.price)}
            isDisabled={isDisabled}
          />
        ))}
      </div>
    </div>
  );
}

export default FirmManager;
