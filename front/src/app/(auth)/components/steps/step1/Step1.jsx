'use client';
import React, { useState } from 'react';
import FirmManager from './roles/firmManager/FirmManager';
import Individ from './roles/individLawyer/Individ';
import FirmLawyer from './roles/FirmLawyer/FirmLawyer';
import styles from './step1.module.css';
import { useForm } from "../../../../components/contexts/FormProvider"; 

function Step1() {
  const [isFirmLawyer, setIsFirmLawyer] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleCheckboxChange = () => {
    setIsFirmLawyer((prev) => {
      const newValue = !prev;
      if (newValue) setSelectedPlan(null);
      return newValue;
    });
  };

  const handleRadioChange = (plan) => {
    setSelectedPlan(plan);
    setIsFirmLawyer(false); 
  };

  return (
    <div className={styles.container}>
      <form className={styles.formContainer}>
        <FirmManager
          selectedPlan={selectedPlan}
          handleRadioChange={handleRadioChange}
          isDisabled={isFirmLawyer}
        />

        <Individ
          selectedPlan={selectedPlan}
          handleRadioChange={handleRadioChange}
          isDisabled={isFirmLawyer}
        />

        <FirmLawyer
          isFirmLawyer={isFirmLawyer}
          handleCheckboxChange={handleCheckboxChange}
        />
      </form>
    </div>
  );
}

export default Step1;