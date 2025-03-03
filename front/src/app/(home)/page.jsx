import React from 'react';
import Link from 'next/link'; 


const Home =()=>{
    return(
        <div>
        <h1>hello to home</h1>
        <Link href='/signup'>go to sign up</Link>
        </div>
    )
}

export default Home;