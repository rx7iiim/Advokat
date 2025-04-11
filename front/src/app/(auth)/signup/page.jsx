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
import Created from '../components/steps/created/Created';
import Payment from '../components/payment/Payment';
import Receipt from '../components/receipt/Receipt';
import Link from "next/link";
import * as dotenv from 'dotenv';
dotenv.config();


const SignUpContent = () => {
  const [step, setStep] = useState(5);
  const { formData, updateFormData, error, setError,errorText,setErrtext } = useForm(); // ✅ Now useForm() works because it's inside FormProvider

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  

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
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          setError(true);
          setErrtext("Invalid email format");
          return;
        }
        
        
        setError(false);
        // let planSelector=null
        // if (!formData.firmPlan){planSelector =formData.individPlan}else{planSelector=formData.firmPlan}
        // axios.defaults.withCredentials = true;
        // try {
        //    const response = await axios.post(`${API_URL}/auth/signup`, { 
        //     firmLawyer:formData.firmLawyer,
        //     plan:planSelector,
        //     email: formData.email,
        //     password: formData.password,
        //     first_name: formData.first_name,
        //     last_name: formData.last_name,
        //     username: formData.username,
        //     role:formData.role,
        //   });
        //  } catch (error) {
        //    console.error("Error verifying email:", error);
        //    setError(true);
        //    setErrtext("Email verification failed.");
        //    return;
        //  }
        break;
  
      case 2: 
        break;
  
      case 3: // Step 4 validation (if any, otherwise continue)
      
      if(formData.phone===""  || formData.firstName==="" || formData.lastName==="" || formData.email==="" || formData.username===""){
        setError(true);
        setErrtext("please fill all fields");
        return;
      }
      const strictPhoneRegex = /^\d{10}$/;
     if (!strictPhoneRegex.test(formData.phone)) {
        setError(true);
        setErrtext("invalid phone format");
        return;
        }
        setError(false);
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
      {step <= 3 && ( <>
      <div className={styles.textContainer}>
      {error && (
        <Alert variant="outlined" severity="error">
          {errorText}
        </Alert>
      )}
        <h1 className={`${styles.title} font-mona text-4xl font-bold`}>Create An Account</h1>
        <p className='font-mona'>
          Already have an account?<Link href="../../login" className='font-mona underline p-1'>Log in</Link>
        </p>
      </div>

      
      <Path step={step} />
      </>
    )}
      {step === 0 && <Step1 />}
      {step === 1 && <Step2 />}
      {step === 2 && <Step3 step={step} setStep={setStep}  />}
      {step === 3 && <Step4 />}
      {step === 4 &&<Created />}
      {step <= 4 && <Buttons onNext={handleNext} onPrev={handlePrev} step={step} />}
      {step === 5 && <Payment step={step} setStep={setStep}/>}
      {step === 6 && <div className="flex justify-center items-center"><Receipt /></div>}
    </div>
  );
}

const SignUp = () => {
  return (
    <FormProvider> 
      <SignUpContent /> 
    </FormProvider>
  );
};

export default SignUp;
