import React from 'react'
import { HiMiniBuildingLibrary } from "react-icons/hi2";

function Firmselect() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6 text-center h-[75vh]">
      <HiMiniBuildingLibrary className="text-5xl" />
      <p className="text-gray-700 max-w-md">
        please write your affiliated law firm and wait administrative approval.<br/>
        you will receive an email notification once your access has been approved
      </p>
      <div className="w-full max-w-xs">
        <input 
          name='firm'
          className="w-full px-4 py-2 border transition-all ease-in border-gray-300 rounded-2xl text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
          type='text'
          placeholder="write your affiliated law firm"
          required
        />
      </div>
    </div>
  )
}

export default Firmselect