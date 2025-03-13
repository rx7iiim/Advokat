import React from 'react'

function Buttons({step, onPrev, onNext}) {
  return (
    <div className={`flex w-[90vw] m-auto 
        flex-row-reverse justify-between
      `}>
     <button onClick={onNext} className='w-auto border-2 border-solid border-[#0000ff] py-2 px-4 text-[#0000ff] rounded-xl font-bold'>{step<=3 ? "next" : "proceed"}</button> 
     {step > 0 && step <= 3 && <button onClick={onPrev} className="w-auto border-2 border-solid border-[#0000ff] py-2 px-4 text-[#0000ff] rounded-xl font-bold">Previous</button>}
    </div>
  )
}

export default Buttons