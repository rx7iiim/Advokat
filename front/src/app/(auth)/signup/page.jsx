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
import FormProvider from '../../components/contexts/FormProvider';

const SignUp = () => {
  

  const [step, setStep] = useState(0);

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);
  return (
    <FormProvider>
    <div className='flex flex-col justify-center'>
      <Upbar />
      <div className={styles.textContainer}>
        <h1 className={`${styles.title} font-mona text-4xl font-bold`}>Create An Account</h1>
        <p className='font-mona'>Already have an account?<span className='font-mona underline p-1'>Log in</span></p>
      </div>
      <Path step={step} />
     { step === 0 && <Step1 />}
     { step === 1 && <Step2 />}
     { step === 2 && <Step3 />}
     { step === 3 && <Step4 />}
     
      <Buttons onNext={handleNext} onPrev={handlePrev} step={step} />
    </div>
    </FormProvider>
  );
}

export default SignUp;
