'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Player } from '@lordicon/react';
import checkedanimation from './system-solid-31-check-hover-check.json';

const Created = () => {
  
  
  const playerRef = useRef(<Player/>);
  
  useEffect(() => {
      playerRef.current?.playFromBeginning();
  }, [])
 
  return (
    <div className='flex flex-col justify-center h-[80vh] w-[100vw] content-center items-center'>
     
      <Player 
        size={296} 
        icon={checkedanimation}
        ref={playerRef}
      />

     <p className='font-mona text-xl '>account created please proceed with the payment</p>
    </div>
  );
};

export default Created;
