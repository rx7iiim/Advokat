import React from 'react';
import styles from './step3.module.css';
import Verification from './Verification';

function Step3({step, setStep}) {
  return (
    <div className={styles.container}>
      <Verification step={step} setStep={setStep} />
    </div>
  )
}

export default Step3
