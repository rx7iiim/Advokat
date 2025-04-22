import React from 'react';
import PlanSelected from './PlanSelected';
import PayCom from './paymentOptions/PayCom';
import {useForm} from '../../../components/contexts/FormContext';
import Alert from '@mui/material/Alert';

function Payment({step, setStep}) {
  const { formData, updateFormData, error, setError,errorText,setErrtext } = useForm();
  return (
    <div className="container h-[80vh] flex flex-col items-center">
      {error && <Alert variant="outlined" severity="error" className='w-1/3'>
          {errorText}
        </Alert>
}  {
  !error && <h1 className='hidden'></h1>
}
    <div className='flex flex-row justify-center h-full items-center mx-auto py-[50px]'>
      <PlanSelected className='grow' step={step} setStep={setStep}/>
      <PayCom className='grow' step={step} setStep={setStep}/>
    </div>
    </div>
  )
}

export default Payment
