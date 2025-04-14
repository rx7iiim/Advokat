
import React from 'react'
import Created from '../steps/created/Created'
import Link from 'next/link'

function Waitfa() {
  return (
    <div className='flex flex-col justify-around h-[80vh] items-center gap-[20px]'>
      <Created text="Request sent! wait for approval" wid='60vh' />
      <Link href="/" className="w-1/3 justify-center text-center items-center transition-all duration-500 bg-blue-600 text-white font-mona font-bold py-3 rounded-md  hover:bg-blue-700">Finish</Link>
    </div>
  )
}

export default Waitfa;
