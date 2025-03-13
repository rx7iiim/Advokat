import React from 'react';
import styles from './path.module.css';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';


const Path = ({step}) => {
const steps = [
    "Choose a plan",
    "Provide your Personal information",
    "verification",
    "Complete your profile"
]

  return (
    <div className={styles.container} >
      <Stepper activeStep={step} alternativeLabel sx={{ width: "100%" }}>
        {steps.map((label) => ( 
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
    </div>
  )
}

export default Path
