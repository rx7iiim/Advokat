import React from "react";
import styles from "./option.module.css";

function Option({ elem, onSelect, isSelected, isDisabled }) {
  return (
    <div className={styles.container}>
      <label htmlFor={elem.label} className="flex flex-col">
        <div>
          <span className="font-bold font-mona">{elem.label}</span>
        </div>
        <div>
          <span className="text-[#272727]">{`${elem.price} DZD / mo`}</span>
        </div>
      </label>
      <input
        type="radio"
        id={elem.label}
        name="pricing-option"
        className="w-5 h-5"
        checked={isSelected}
        onChange={onSelect}
        disabled={isDisabled}
      />
    </div>
  );
}

export default Option;
