'use client'
import React, { useState } from "react";
import styles from './signup.module.css'
import Upbar from '../../components/Upbar/Upbar.jsx';
import Path from '../components/steps/path/Path.jsx';
import Step1 from '../components/steps/step1/Step1';
import Step2 from '../components/steps/step2/Step2';
import Step3 from '../components/steps/step3/Step3';
import Step4 from '../components/steps/step4/Step4';
import Buttons from './Buttons';
import { FormProvider } from "@/app/components/contexts/FormContext";
import { useForm } from "../../components/contexts/FormContext";
import Alert from '@mui/material/Alert';
import axios from 'axios';



const SignUpContent = () => {
  const [step, setStep] = useState(0);
  const { formData, updateFormData, error, setError,errorText,setErrtext } = useForm(); // ✅ Now useForm() works because it's inside FormProvider

  const API_URL = 'http://localhost:3005';
  let response;

  const handleNext = async() => {
    switch (step) {
      case 0: // Step 1 validation
        if (!formData.firmPlan && !formData.individPlan && !formData.firmLawyer) {
          setError(true);
          setErrtext("you must choose a plan");
          return;
        }
        setError(false);
        break;
  
      case 1: // Step 2 validation
        if (formData.first_name==="" || formData.last_name==="" || formData.email==="" || formData.username==="" || formData.password==="" || formData.confirmedPassword==="") {
          setError(true);
          setErrtext("please fill all the fields");
          return;
        }
        if (formData.password !== formData.confirmedPassword) {
          setError(true);
          setErrtext("please check ur password")
          return;
        }
        setError(false);
        // try {
        //   const response = await axios.post(`${API_URL}/auth/signup`, {
        //     email: formData.email,
        //     password: formData.password,
        //     first_name: formData.first_name,
        //     last_name: formData.last_name,
        //     username: formData.username
        //   });
        //   console.log(response);
        // } catch (error) {
        //   console.error("Error verifying email:", error);
        //   setError(true);
        //   setErrtext("Email verification failed.");
        //   return;
        // }
        break;
  
      case 2: 
        break;
  
      case 3: // Step 4 validation (if any, otherwise continue)
      if(formData.phone === '' || formData.firstName==="" || formData.lastName==="" || formData.email==="" || formData.username===""){
        setError(true);
        setErrtext("please fill phone number");
      }
        break;
  
      default:
        break;
    }
  
    setStep((prev) => prev + 1);
  };
  const handlePrev = () => setStep((prev) => prev - 1);
  
  

  return (
    <div className='flex flex-col justify-center'>
      <Upbar />
      
      <div className={styles.textContainer}>
      {error && (
        <Alert variant="outlined" severity="error">
          {errorText}
        </Alert>
      )}
        <h1 className={`${styles.title} font-mona text-4xl font-bold`}>Create An Account</h1>
        <p className='font-mona'>
          Already have an account?<span className='font-mona underline p-1'>Log in</span>
        </p>
      </div>
      <Path step={step} />
      {step === 0 && <Step1 />}
      {step === 1 && <Step2 />}
      {step === 2 && <Step3 />}
      {step === 3 && <Step4 />}
      
      <Buttons onNext={handleNext} onPrev={handlePrev} step={step} />
    </div>
  );
}

const SignUp = () => {
  return (
    <FormProvider> {/* ✅ Wrap only the child component */}
      <SignUpContent /> {/* Now this can safely use useForm() */}
    </FormProvider>
  );
};

export default SignUp;
