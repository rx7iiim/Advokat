'use client';

import React from "react";
import styles from './input.module.css';
import TextField from '@mui/material/TextField';
import { useForm } from "../../../../components/contexts/FormContext"; // ✅ Import useForm

function Inpute({ elem }) {

  const { formData, updateFormData,error, setError,errorText,setErrtext } = useForm();
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
      if (!emailRegex.test(value)) {
        setError(true);
        setErrtext("Invalid email format");
      } else {
        setError(false);// ✅ Clears error when email is valid
        setErrtext("");
      }
    }
  
    updateFormData(name, value); // ✅ Always update form data
  };
  
  return (
    <div className={`${styles.elementContainer} w-[30%]`}>
      <TextField 
        name={elem.name}
        label={elem.label}

        className='rounded-2xl'
        type={elem.type}
        onChange={handleChange}
        placeholder={elem.placeholder}
        required
      />
    </div>
  );
}

export default Inpute;