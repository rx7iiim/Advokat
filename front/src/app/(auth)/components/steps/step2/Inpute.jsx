'use client';

import React, { useState } from "react";
import styles from './input.module.css';
import TextField from '@mui/material/TextField';


function Inpute({elem}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(`Name: ${name}, Value: ${value}`);
  };
  
  return (
    <div className={`${styles.elementContainer} w-[30%]`}>
      
      <TextField  name={`${elem.name}`} label={elem.label} className='rounded-2xl' type={`${elem.type}`} value={formData[elem.name]} onChange={handleChange} placeholder={`${elem.placeholder}`}  required />
    </div>
  )
}

export default Inpute
