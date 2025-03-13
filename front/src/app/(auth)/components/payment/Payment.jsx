import React from 'react';
import PlanSelected from './PlanSelected';
import PayCom from './paymentOptions/PayCom';
import {useForm} from '../../../components/contexts/FormContext'

function Payment({step, setStep}) {
  return (
    <div className='flex flex-row justify-center h-[80vh] items-center mx-auto py-[50px]'>
      <PlanSelected className='grow' step={step} setStep={setStep}/>
      <PayCom className='grow' step={step} setStep={setStep}/>
    </div>
  )
}

export default Payment
